/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '@kitibyte/ldb/ldb.js' {
  /** STUB */
  export class Client {
    constructor(options: { accessToken?: string });

    request(
      operation: 'ArrivalsDepartures',
      params: Record<string, unknown>
    ): Promise<any>;
  }
}
declare module '@kitibyte/ldb/operations.js' {
  /** STUB */
  export const ArrivalsDepartures: {
    requestSchema: any;
  };
}
