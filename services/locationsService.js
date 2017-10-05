export default class LocationsService {
    constructor(postcodesApiClient) {
        this.postcodesApiClient = postcodesApiClient;
    }

    getLocation(postcode) {
        return this.postcodesApiClient.getLocation(postcode);
    }
}
