import { convert } from 'xmlbuilder2';

export class SoapRequest {
  method = 'POST';
  headers = {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  };
  body: string;

  constructor(
    public url: string,
    init: {
      header: Record<string, unknown>;
      body: Record<string, unknown>;
    }
  ) {
    this.body = convert({
      'soap:Envelope': {
        '@xmlns:soap': 'http://www.w3.org/2003/05/soap-envelope',
        'soap:Header': init.header,
        'soap:Body': init.body,
      },
    });
  }

  async execute() {
    return new SoapResponse(await fetch(this.url, this));
  }
}

class SoapResponse {
  constructor(public response: Response) {}

  async xml() {
    return convert(await this.response.text(), {
      format: 'object',
      noDoubleEncoding: true,
    });
  }
}

export class SoapFault extends Error {
  name = 'SoapFault';
  code: unknown;

  constructor(fault: { Code: unknown; Reason: unknown }) {
    super(Object(fault.Reason)['#'] || fault.Reason);
    this.code = fault.Code;
  }
}
