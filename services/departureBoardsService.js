import DepartureBoard from '../models/departureBoard';

export default class DepartureBoardsService {
    constructor(arrivalsService, locationsService, stopPointsService) {
        this.arrivalsService = arrivalsService;
        this.locationsService = locationsService;
        this.stopPointsService = stopPointsService;
    }

    getEarliestArrivalsForStopPoints(stopPoints, arrivalsCount) {
        return Promise.all(stopPoints.map(stopPoint =>
            this.arrivalsService.getEarliestArrivals(stopPoint.naptanId, arrivalsCount)
                .then(arrivals => new DepartureBoard(stopPoint, arrivals))
        ));
    }

    getDepartureBoardsForPostcode(postcode, stopCount, arrivalsPerStop) {
        return this.locationsService.getLocation(postcode)
            .then(location => this.stopPointsService.getNearestStopPoints(location.latitude, location.longitude, stopCount))
            .then(stopPoints => this.getEarliestArrivalsForStopPoints(stopPoints, arrivalsPerStop));
    }
}
