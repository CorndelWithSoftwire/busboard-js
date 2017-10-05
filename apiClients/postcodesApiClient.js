import BaseApiClient from './baseApiClient';

const BASE_URL = 'https://api.postcodes.io';

export default class PostcodesApiClient extends BaseApiClient {
    constructor() {
        super(BASE_URL, []);
    }

    // Returns a Promise that, upon success, resolves 
    // to a single Location object.
    getLocation(postcode) {
        return this.makeGetRequest(
            `postcodes/${postcode}`, 
            []
        );
    }
}
