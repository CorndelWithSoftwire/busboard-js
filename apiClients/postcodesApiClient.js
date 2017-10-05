import BaseApiClient from './baseApiClient';
import Location from '../models/location';

const BASE_URL = 'https://api.postcodes.io';

export default class PostcodesApiClient extends BaseApiClient {
    constructor() {
        super(BASE_URL, []);
    }

    // The success callback passed to this function should expect 
    // to be given a single Location object.
    getLocation(postcode, onSuccess, onError) {
        this.makeGetRequest(
            `postcodes/${postcode}`,
            (response, body) => {
                const jsonBody = JSON.parse(body);
                onSuccess(new Location(jsonBody.latitude, jsonBody.longitude));
            },
            error => onError(error)
        );
    }
}
