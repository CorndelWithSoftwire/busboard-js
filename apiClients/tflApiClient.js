import BaseApiClient from './baseApiClient';
import ArrivalPrediction from '../models/arrivalPrediction';
import StopPoint from '../models/stopPoint';

const BASE_URL = 'https://api.tfl.gov.uk';
const REQUIRED_PARAMS = [
    {name: 'app_id', value: '07b2b2b4'},
    {name: 'app_key', value: '39b80112283c09159030675d88b103a8'}
];

export default class TflApiClient extends BaseApiClient {
    constructor() {
        super(BASE_URL, REQUIRED_PARAMS);
    }

    // The success callback passed to this method should expect 
    // to be given an array of ArrivalPrediction objects.
    getArrivalPredictions(stopId, onSuccess, onError) {
        const endpoint = `StopPoint/${stopId}/Arrivals`;
        const parameters = [];

        this.makeGetRequest(
            endpoint,
            parameters,
            (response, body) => {
                const arrivalPredictions = JSON.parse(body).map(entity =>
                    new ArrivalPrediction(entity.lineName, entity.destinationName, entity.timeToStation)
                );
                onSuccess(arrivalPredictions);
            },
            error => onError(error)
        );
    }

    // The success callback passed to this method should expect
    // to be given an array of StopPoint objects, from nearest
    // to furthest.
    getStopPointsNear(location, onSuccess, onError) {
        const endpoint = `StopPoint`;
        const parameters = [
            {name: 'stopTypes', value: 'NaptanPublicBusCoachTram'},
            {name: 'lat', value: location.latitude},
            {name: 'lon', value: location.longitude},
            {name: 'radius', value: 1000}
        ];

        this.makeGetRequest(
            endpoint,
            parameters,
            (response, body) => {
                const stopPoints = JSON.parse(body).stopPoints.map(entity =>
                    new StopPoint(entity.naptanId, entity.commonName)
                );
                onSuccess(stopPoints);
            },
            error => onError(error)
        )
    }
}
