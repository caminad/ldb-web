var Query_possibleTypes = ['Query'];
export var isQuery = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isQuery"');
  return Query_possibleTypes.includes(obj.__typename);
};

var GetStationBoardResult_possibleTypes = ['GetStationBoardResult'];
export var isGetStationBoardResult = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isGetStationBoardResult"');
  return GetStationBoardResult_possibleTypes.includes(obj.__typename);
};

var ServiceItem_possibleTypes = ['ServiceItem'];
export var isServiceItem = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isServiceItem"');
  return ServiceItem_possibleTypes.includes(obj.__typename);
};

var ServiceLocation_possibleTypes = ['ServiceLocation'];
export var isServiceLocation = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isServiceLocation"');
  return ServiceLocation_possibleTypes.includes(obj.__typename);
};

var FormationData_possibleTypes = ['FormationData'];
export var isFormationData = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isFormationData"');
  return FormationData_possibleTypes.includes(obj.__typename);
};

var CoachData_possibleTypes = ['CoachData'];
export var isCoachData = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isCoachData"');
  return CoachData_possibleTypes.includes(obj.__typename);
};

var ToiletAvailabilityType_possibleTypes = ['ToiletAvailabilityType'];
export var isToiletAvailabilityType = function (obj) {
  if (!obj || !obj.__typename)
    throw new Error('__typename is missing in "isToiletAvailabilityType"');
  return ToiletAvailabilityType_possibleTypes.includes(obj.__typename);
};
