export default class ArrivalsService {
    constructor(tflApiClient) {
        this.tflApiClient = tflApiClient;
    }

    getEarliestArrivals(stopId, count) {
        return this.tflApiClient.getArrivalPredictions(stopId)
            .then(arrivals => arrivals.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, count));
    }
}
