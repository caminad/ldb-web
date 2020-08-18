import Ajv from 'ajv';
import { decodeHTML, decodeXML } from 'entities';
import { resolve } from 'url';
import operations from './operations';
import { SoapFault, SoapRequest } from './soap';

export class Client {
  static origin = 'https://realtime.nationalrail.co.uk';

  static isOperationName(obj: unknown): obj is keyof typeof operations {
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

  accessToken: string;

  constructor(options: { accessToken: string }) {
    this.accessToken = options.accessToken;
  }

  async request(
    operation: keyof typeof operations,
    params: Record<string, unknown>
  ) {
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
 */
function walk(holder: { [key: string]: unknown }, key: string) {
  let value: any = holder[key];

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
