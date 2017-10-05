import { createInterface } from 'readline';

const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

export default class ConsoleRunner {
    constructor(departureBoardsService) {
        this.departureBoardsService = departureBoardsService;
    }

    handleError(reason) {
        console.error('\n' + reason);
        this.runForever();
    }

    promptForPostcode() {
        return new Promise((resolve, reject) =>
            readline.question('\nEnter your postcode: ', resolve)
        );
    }
    
    displayArrivals(stopPoint, arrivals) {
        console.log(`\nDeparture board for ${stopPoint.commonName}:`);
        arrivals.forEach(arrival => 
            console.log(`  ${Math.round(arrival.timeToStation / 60)} minutes: ${arrival.lineName} to ${arrival.destinationName}`)
        );
    }

    displayDepartureBoards(departureBoards) {
        departureBoards.forEach(board => {
            this.displayArrivals(board.stopPoint, board.arrivals);
        });
    }

    runForever() {
        this.promptForPostcode()
            .then(postcode => this.departureBoardsService.getDepartureBoardsForPostcode(postcode.replace(/\s/g, ''), 2, 5))
            .then(departureBoards => {
                this.displayDepartureBoards(departureBoards);
                this.runForever();
            })
            .catch(reason => this.handleError(reason));
    }
}