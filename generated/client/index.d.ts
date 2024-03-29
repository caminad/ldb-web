import {
  FieldsSelection,
  GraphqlOperation,
  ClientOptions,
  Observable,
} from '@genql/runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';
export * from './schema';
import { QueryRequest, QueryPromiseChain, Query } from './schema';
export declare const createClient: (options?: ClientOptions) => Client;
export declare const everything: { __scalar: boolean };
export declare const version: string;

export interface Client {
  wsClient?: SubscriptionClient;

  query<R extends QueryRequest>(
    request: R & { __name?: string }
  ): Promise<FieldsSelection<Query, R>>;

  chain: {
    query: QueryPromiseChain;
  };
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<
  Query,
  fields
>;

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string }
) => GraphqlOperation;

export declare const enumFilterType = {
  from: 'from',
  to: 'to',
} as const;

export declare const enumToiletStatus = {
  Unknown: 'Unknown',
  InService: 'InService',
  NotInService: 'NotInService',
} as const;

export declare const enumToiletType = {
  Unknown: 'Unknown',
  None: 'None',
  Standard: 'Standard',
  Accessible: 'Accessible',
} as const;
