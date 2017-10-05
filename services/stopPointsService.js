import StopPoint from '../models/stopPoint';

export default class StopPointsService {
    constructor(tflApiClient) {
        this.tflApiClient = tflApiClient;
    }

    getNearbyStopPoints(latitude, longitude) {
        return this.tflApiClient.getNearbyStopPoints(latitude, longitude)
            .then(responseBody =>
                JSON.parse(responseBody).stopPoints.map(entity =>
                    new StopPoint(entity.naptanId, entity.commonName)
                )
            );
    }

    getNearestStopPoints(latitude, longitude, count) {
        return this.getNearbyStopPoints(latitude, longitude)
            .then(stopPoints => stopPoints.slice(0, count));
    }
}
