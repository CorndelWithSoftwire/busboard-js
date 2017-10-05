import { URL } from 'url';
import request from 'request';
import ArrivalPrediction from './arrivalPrediction';

const BASE_URL = 'https://api.tfl.gov.uk';
const REQUIRED_PARAMS = [
    {name: 'app_id', value: '07b2b2b4'},
    {name: 'app_key', value: '39b80112283c09159030675d88b103a8'}
];

function getRequestUrl(endpoint) {
    const requestUrl = new URL(endpoint, BASE_URL);
    REQUIRED_PARAMS.forEach(param => requestUrl.searchParams.append(param.name, param.value));
    return requestUrl.href;
}

// The callback passed to this function should expect to be 
// passed an array of ArrivalPrediction objects.
export function getArrivalPredictions(stopId, callback) {
    const url = getRequestUrl(`StopPoint/${stopId}/Arrivals`);
    request.get(url, (err, response, body) => {
        if (err) {
            throw err;
        } else if (response.statusCode !== 200) {
            throw new Error(`Request to ${url} failed with status code ${response.statusCode}`);
        } else {
            const arrivalPredictions = JSON.parse(body).map(entity =>
                new ArrivalPrediction(entity.lineName, entity.destinationName, entity.timeToStation)
            );
            callback(arrivalPredictions);
        }
    });
}
