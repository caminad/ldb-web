const fetch = require("node-fetch").default;
const xmlbuilder2 = require("xmlbuilder2");

class SoapRequest {
  /**
   * @param {string} url
   * @param {object} init
   * @param {Record<string, unknown>} init.header
   * @param {Record<string, unknown>} init.body
   */
  constructor(url, init) {
    this.method = "POST";
    this.url = url;
    this.headers = {
      "Content-Type": "application/soap+xml; charset=utf-8",
    };
    this.body = xmlbuilder2.convert({
      "soap:Envelope": {
        "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
        "soap:Header": init.header,
        "soap:Body": init.body,
      },
    });
  }

  async execute() {
    return new SoapResponse(await fetch(this.url, this));
  }
}

class SoapResponse {
  /**
   * @param {import('node-fetch').Response} response
   */
  constructor(response) {
    this.response = response;
  }

  async xml() {
    return xmlbuilder2.convert(await this.response.text(), {
      format: "object",
      noDoubleEncoding: true,
    });
  }
}

class SoapFault extends Error {
  name = "SoapFault";

  /**
   * @param {object} fault
   * @param {unknown} fault.Code
   * @param {unknown} fault.Reason
   */
  constructor(fault) {
    super(Object(fault.Reason)["#"] || fault.Reason);
    this.code = fault.Code;
  }
}

module.exports = { SoapRequest, SoapFault };
