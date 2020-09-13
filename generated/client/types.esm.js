export default {
    "scalars": [
        2,
        3,
        4,
        5,
        6,
        7,
        9,
        14,
        15,
        16,
        17,
        18
    ],
    "types": {
        "Query": {
            "station": [
                1,
                {
                    "crs": [
                        4,
                        "CRS!"
                    ],
                    "numRows": [
                        16
                    ],
                    "filterCrs": [
                        4
                    ],
                    "filterType": [
                        5
                    ],
                    "timeOffset": [
                        17
                    ],
                    "timeWindow": [
                        18
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "GetStationBoardResult": {
            "generatedAt": [
                2
            ],
            "locationName": [
                3
            ],
            "crs": [
                4
            ],
            "filterLocationName": [
                3
            ],
            "filtercrs": [
                3
            ],
            "filterType": [
                5
            ],
            "nrccMessages": [
                6
            ],
            "platformAvailable": [
                7
            ],
            "areServicesAvailable": [
                7
            ],
            "trainServices": [
                8
            ],
            "busServices": [
                8
            ],
            "ferryServices": [
                8
            ],
            "__typename": [
                3
            ]
        },
        "DateTime": {},
        "String": {},
        "CRS": {},
        "FilterType": {},
        "Message": {},
        "Boolean": {},
        "ServiceItem": {
            "sta": [
                3
            ],
            "eta": [
                3
            ],
            "std": [
                3
            ],
            "etd": [
                3
            ],
            "platform": [
                3
            ],
            "operator": [
                3
            ],
            "operatorCode": [
                3
            ],
            "isCircularRoute": [
                7
            ],
            "isCancelled": [
                7
            ],
            "filterLocationCancelled": [
                7
            ],
            "serviceType": [
                3
            ],
            "length": [
                9
            ],
            "detachFront": [
                7
            ],
            "isReverseFormation": [
                7
            ],
            "cancelReason": [
                3
            ],
            "delayReason": [
                3
            ],
            "adhocAlerts": [
                3
            ],
            "serviceID": [
                3
            ],
            "rsid": [
                3
            ],
            "origin": [
                10
            ],
            "destination": [
                10
            ],
            "currentOrigins": [
                10
            ],
            "currentDestinations": [
                10
            ],
            "formation": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "Int": {},
        "ServiceLocation": {
            "locationName": [
                3
            ],
            "crs": [
                4
            ],
            "via": [
                3
            ],
            "futureChangeTo": [
                3
            ],
            "assocIsCancelled": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "FormationData": {
            "avgLoading": [
                9
            ],
            "coaches": [
                12
            ],
            "__typename": [
                3
            ]
        },
        "CoachData": {
            "coachClass": [
                3
            ],
            "loading": [
                9
            ],
            "number": [
                3
            ],
            "toilet": [
                13
            ],
            "__typename": [
                3
            ]
        },
        "ToiletAvailabilityType": {
            "status": [
                14
            ],
            "value": [
                15
            ],
            "__typename": [
                3
            ]
        },
        "ToiletStatus": {},
        "ToiletType": {},
        "PositiveInt": {},
        "TimeOffset": {},
        "TimeWindow": {}
    }
}