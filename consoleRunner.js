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

    handleError(reason) {
        console.error(reason);
        this.runForever();
    }

    promptForPostcode() {
        return new Promise((resolve, reject) =>
            readline.question('\nEnter your postcode: ', resolve)
        );
    }

    getEarliestPredictions(predictions) {
        return predictions.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
    }
    
    displayPredictions(stopPoint, predictions) {
        console.log(`\nDeparture board for ${stopPoint.commonName}:`);
        predictions.forEach(prediction => 
            console.log(`  ${Math.round(prediction.timeToStation / 60)} minutes: ${prediction.lineName} to ${prediction.destinationName}`)
        );
    }

    runForever() {
        this.promptForPostcode()
            .then(postcode => this.postcodesApiClient.getLocation(postcode))
            .then(location => this.tflApiClient.getStopPointsNear(location))
            .then(stopPoints => Promise.all(stopPoints.slice(0, 2).map(stopPoint => 
                this.tflApiClient.getArrivalPredictions(stopPoint.naptanId)
                    .then(predictions => ({stopPoint, predictions})))))
            .then(stopPointsAndPredictions => {
                stopPointsAndPredictions.forEach(data => {
                    const earliestPredictions = this.getEarliestPredictions(data.predictions);
                    this.displayPredictions(data.stopPoint, earliestPredictions);
                });
                this.runForever();
            })
            .catch(reason => this.handleError(reason));
    }
}