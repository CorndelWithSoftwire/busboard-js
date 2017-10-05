import { createInterface } from 'readline';
import { getArrivalPredictions } from './tfl/tflApiClient';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForStopIdAndThen(callback) {
    readline.question('Enter your stop ID: ', callback);
}

function displayPredictions(stopId, arrivalPredictions) {
    console.log(`\nPredictions for ${stopId}:`);
    arrivalPredictions.forEach(prediction => 
        console.log(`  ${Math.round(prediction.timeToStation / 60)} minutes: ${prediction.lineName} to ${prediction.destinationName}`)
    );
}

promptForStopIdAndThen(stopId => {
    try {
        getArrivalPredictions(stopId, predictions => {
            const earliestArrivals = predictions.sort((a, b) => a.timeToStation - b.timeToStation).slice(0, 5);
            displayPredictions(stopId, earliestArrivals);
        });
    } catch (e) {
        console.error(e.message);
    } finally {
        readline.close();
    }
});