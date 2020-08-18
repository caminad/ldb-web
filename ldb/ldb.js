const Ajv = require('ajv');
const { decodeXML, decodeHTML } = require('entities');
const { resolve } = require('url');
const operations = require('./operations.js');
const { SoapFault, SoapRequest } = require('./soap.js');

class Client {
  static origin = 'https://realtime.nationalrail.co.uk';

  /**
   * @param {unknown} obj
   * @returns {obj is keyof typeof operations}
   */
  static isOperationName(obj) {
    return typeof obj === 'string' && obj in operations;
  }

  static operationNames() {
    return Object.keys(operations);
  }

  endpoint = resolve(Client.origin, '/OpenLDBWS/ldb11.asmx');

  ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    strictDefaults: true,
  });

  /**
   * @param {object} options
   * @param {string} options.accessToken
   */
  constructor({ accessToken }) {
    this.accessToken = accessToken;
  }

  /**
   * @param {keyof typeof operations} operation
   * @param {Record<string, unknown>} params
   */
  async request(operation, params) {
    const { requestName, requestSchema } = operations[operation];

    const validateParams = this.ajv.compile(requestSchema);
    if (!validateParams(params)) {
      if (validateParams.errors) {
        const { dataPath, message } = validateParams.errors[0];
        throw new TypeError(`params${dataPath} ${message}`);
      } else {
        throw new TypeError(`params validation failed`);
      }
    }

    const response = await new SoapRequest(this.endpoint, {
      header: {
        AccessToken: { TokenValue: this.accessToken },
      },
      body: {
        '@xmlns': 'http://thalesgroup.com/RTTI/2017-10-01/ldb/',
        [requestName]: params,
      },
    }).execute();

    return walk({ '': await response.xml() }, '');
  }
}

/**
 * Adapted from https://github.com/douglascrockford/JSON-js/blob/master/json2.js
 * @param {{ [key: string]: unknown }} holder
 * @param {string} key
 */
function walk(holder, key) {
  /** @type {any} */
  let value = holder[key];

  if (value && typeof value === 'object') {
    for (const childKey of Object.keys(value)) {
      const childValue = walk(value, childKey);
      if (childValue !== undefined) {
        value[childKey] = childValue;
      } else {
        delete value[childKey];
      }
    }
    if (Object.keys(value).length === 1) {
      // Remove a level of nesting for objects with a single key
      value = Object.values(value)[0];
    }
  } else if (value === 'true') {
    value = true;
  } else if (value === 'false') {
    value = false;
  } else if (typeof value === 'string') {
    // Some entities in message text are double encoded.
    // This assumes that "&amp;amp;" is always a data entry mistake and not intended.
    value = decodeHTML(decodeXML(value));
  }

  if (key === 'soap:Fault') {
    throw new SoapFault(value);
  }

  const prefixEnd = key.indexOf(':');
  const prefix = key.substring(0, prefixEnd);
  const name = key.substring(prefixEnd + 1);

  if (prefix === '@xmlns' || name === '@xmlns') {
    // Drop namespace aliases and namespaces
  } else if (prefix === '@xsi' && name === 'nil') {
    // Drop nil value
  } else if (name.startsWith('@')) {
    // Strip attribute prefix
    holder[name.slice(1)] = value;
  } else if (prefix !== '') {
    // Strip namespace prefix
    holder[name] = value;
  } else {
    return value;
  }
}

module.exports = { Client };
