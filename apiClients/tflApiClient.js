import BaseApiClient from './baseApiClient';
import ArrivalPrediction from '../models/arrivalPrediction';

const BASE_URL = 'https://api.tfl.gov.uk';
const REQUIRED_PARAMS = [
    {name: 'app_id', value: '07b2b2b4'},
    {name: 'app_key', value: '39b80112283c09159030675d88b103a8'}
];

export default class TflApiClient extends BaseApiClient {
    constructor() {
        super(BASE_URL, REQUIRED_PARAMS);
    }

    // The success callback passed to this function should expect 
    // to be given an array of ArrivalPrediction objects.
    getArrivalPredictions(stopId, onSuccess, onError) {
        this.makeGetRequest(
            `StopPoint/${stopId}/Arrivals`,
            (response, body) => {
                const arrivalPredictions = JSON.parse(body).map(entity =>
                    new ArrivalPrediction(entity.lineName, entity.destinationName, entity.timeToStation)
                );
                onSuccess(arrivalPredictions);
            },
            error => onError(error)
        );
    }
}
