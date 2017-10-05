import ArrivalPrediction from '../models/arrivalPrediction';

export default class ArrivalsService {
    constructor(tflApiClient) {
        this.tflApiClient = tflApiClient;
    }

    getArrivals(stopId) {
        return this.tflApiClient.getArrivalPredictions(stopId)
            .then(body =>
                JSON.parse(body).map(entity =>
                    new ArrivalPrediction(entity.lineName, entity.destinationName, entity.timeToStation)
                )    
            );
    }

    getEarliestArrivals(stopId, count) {
        return this.getArrivals(stopId)
            .then(arrivals => arrivals.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, count));
    }
}
