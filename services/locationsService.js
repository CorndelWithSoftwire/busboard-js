import Location from '../models/location';

export default class LocationsService {
    constructor(postcodesApiClient) {
        this.postcodesApiClient = postcodesApiClient;
    }

    getLocation(postcode) {
        return this.postcodesApiClient.getLocation(postcode)
            .then(responseBody => {
                const jsonBody = JSON.parse(responseBody);
                return new Location(jsonBody.result.latitude, jsonBody.result.longitude);
        });
    }
}
