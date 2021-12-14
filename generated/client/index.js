import {
  linkTypeMap,
  createClient as createClientOriginal,
  generateGraphqlOperation,
  assertSameVersion,
} from '@genql/runtime';
import types from './types.esm';
var typeMap = linkTypeMap(types);
export * from './guards.esm';

export var version = '2.8.0';
assertSameVersion(version);

export var createClient = function (options) {
  options = options || {};
  var optionsCopy = {
    url: 'https://ldb-graphql.vercel.app/api',
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription,
  };
  for (var name in options) {
    optionsCopy[name] = options[name];
  }
  return createClientOriginal(optionsCopy);
};

export const enumFilterType = {
  from: 'from',
  to: 'to',
};

export const enumToiletStatus = {
  Unknown: 'Unknown',
  InService: 'InService',
  NotInService: 'NotInService',
};

export const enumToiletType = {
  Unknown: 'Unknown',
  None: 'None',
  Standard: 'Standard',
  Accessible: 'Accessible',
};

export var generateQueryOp = function (fields) {
  return generateGraphqlOperation('query', typeMap.Query, fields);
};
export var generateMutationOp = function (fields) {
  return generateGraphqlOperation('mutation', typeMap.Mutation, fields);
};
export var generateSubscriptionOp = function (fields) {
  return generateGraphqlOperation('subscription', typeMap.Subscription, fields);
};
export var everything = {
  __scalar: true,
};
