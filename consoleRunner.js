import { createInterface } from 'readline';
import TflApiClient from './apiClients/tflApiClient';
import PostcodesApiClient from './apiClients/postcodesApiClient';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

export default class ConsoleRunner {
    constructor() {
        this.tflApiClient = new TflApiClient();
        this.postcodesApiClient = new PostcodesApiClient();
    }

    handleError(err) {
        console.error(err.message);
        this.runForever();
    }

    getEarliestArrivals(predictions) {
        return predictions.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
    }
    
    displayPredictions(stopPoint, predictions) {
        console.log(`\nDeparture board for ${stopPoint.commonName}:`);
        predictions.forEach(prediction => 
            console.log(`  ${Math.round(prediction.timeToStation / 60)} minutes: ${prediction.lineName} to ${prediction.destinationName}`)
        );
    }

    getArrivalPredictionsAndThen(stopPoints, predictionsByStopPointCallback) {
        let predictionsByStopPoint = new Map();
        let completedCount = 0;

        stopPoints.forEach(stopPoint => {
            this.tflApiClient.getArrivalPredictions(
                stopPoint.naptanId, 
                predictions => {
                    predictionsByStopPoint.set(stopPoint, predictions);
                    if (++completedCount === stopPoints.length) {
                        predictionsByStopPointCallback(predictionsByStopPoint);
                    }
                },
                err => this.handleError(err)
            );
        });
    }

    getNearbyStopPointsAndThen(location, stopPointsCallback) {
        this.tflApiClient.getStopPointsNear(location, stopPointsCallback, err => this.handleError(err));
    }

    getLocationAndThen(postcode, locationCallback) {
        this.postcodesApiClient.getLocation(postcode, locationCallback, err => this.handleError(err));
    }

    promptForPostcodeAndThen(postcodeCallback) {
        readline.question('\nEnter your postcode: ', postcode => postcodeCallback(postcode.replace(/\s/g, '')));
    }

    runForever() {
        this.promptForPostcodeAndThen(postcode =>
            this.getLocationAndThen(postcode, location =>
                this.getNearbyStopPointsAndThen(location, stopPoints =>
                    this.getArrivalPredictionsAndThen(stopPoints.slice(0, 2), predictionsByStopPoint => {
                        predictionsByStopPoint.forEach((predictions, stopPoint) => {
                            const earliestArrivals = this.getEarliestArrivals(predictions);
                            this.displayPredictions(stopPoint, earliestArrivals);
                        });
                        this.runForever();
                    })
                )
            )
        );
    }
}