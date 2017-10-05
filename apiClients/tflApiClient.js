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

    // Returns a Promise that, upon success, resolves 
    // to an array of ArrivalPrediction objects.
    getArrivalPredictions(stopId, onSuccess, onError) {
        const endpoint = `StopPoint/${stopId}/Arrivals`;
        const parameters = [];

        return this.makeGetRequest(endpoint, parameters).then(body =>
            JSON.parse(body).map(entity =>
                new ArrivalPrediction(entity.lineName, entity.destinationName, entity.timeToStation)
            )    
        );
    }

    // Returns a Promise that, upon success, resolves 
    // to an array of StopPoint objects, from nearest 
    // to furthest.
    getNearbyStopPoints(latitude, longitude) {
        const endpoint = `StopPoint`;
        const parameters = [
            {name: 'stopTypes', value: 'NaptanPublicBusCoachTram'},
            {name: 'lat', value: latitude},
            {name: 'lon', value: longitude},
            {name: 'radius', value: 1000}
        ];

        return this.makeGetRequest(endpoint, parameters).then(body =>
            JSON.parse(body).stopPoints.map(entity =>
                new StopPoint(entity.naptanId, entity.commonName)
            )
        );
    }
}
