import { createInterface } from 'readline';
import { getArrivalPredictions } from './apiClients/tflApiClient';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForStopIdAndThen(callback) {
    readline.question('\nEnter your stop ID: ', callback);
}

function displayPredictions(stopId, predictions) {
    console.log(`\nPredictions for ${stopId}:`);
    predictions.forEach(prediction => 
        console.log(`  ${Math.round(prediction.timeToStation / 60)} minutes: ${prediction.lineName} to ${prediction.destinationName}`)
    );
}

function displayEarliestPredictions(stopId, predictions) {
    const earliestPredictions = predictions.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
    displayPredictions(stopId, earliestPredictions);
}

function runForever() {
    promptForStopIdAndThen(stopId => {
        getArrivalPredictions(
            stopId, 
            predictions => {
                displayEarliestPredictions(stopId, predictions);
                runForever();
            },
            err => {
                console.error(err.message);
                runForever();
            }
        );
    });
}

runForever();
