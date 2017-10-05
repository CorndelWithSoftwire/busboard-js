import BaseApiClient from './baseApiClient';
import Location from '../models/location';

const BASE_URL = 'https://api.postcodes.io';

export default class PostcodesApiClient extends BaseApiClient {
    constructor() {
        super(BASE_URL, []);
    }

    // Returns a Promise that, upon success, resolves 
    // to a single Location object.
    getLocation(postcode) {
        const endpoint = `postcodes/${postcode}`;
        const parameters = [];

        return this.makeGetRequest(endpoint, parameters).then(body => {
            const jsonBody = JSON.parse(body);
            return new Location(jsonBody.result.latitude, jsonBody.result.longitude);
        });
    }
}
