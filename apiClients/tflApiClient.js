import BaseApiClient from './baseApiClient';

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
        return this.makeGetRequest(
            `StopPoint/${stopId}/Arrivals`, 
            []
        );
    }

    // Returns a Promise that, upon success, resolves 
    // to an array of StopPoint objects, from nearest 
    // to furthest.
    getNearbyStopPoints(latitude, longitude) {
        return this.makeGetRequest(
            `StopPoint`, 
            [
                {name: 'stopTypes', value: 'NaptanPublicBusCoachTram'},
                {name: 'lat', value: latitude},
                {name: 'lon', value: longitude},
                {name: 'radius', value: 1000}
            ]
        );
    }
}
