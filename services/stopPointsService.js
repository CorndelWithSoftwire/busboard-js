export default class StopPointsService {
    constructor(tflApiClient) {
        this.tflApiClient = tflApiClient;
    }

    getNearestStopPoints(latitude, longitude, count) {
        return this.tflApiClient.getNearbyStopPoints(latitude, longitude)
            .then(stopPoints => stopPoints.slice(0, count));
    }
}
