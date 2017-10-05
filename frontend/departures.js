function updateHtmlWithError(response) {
    document.getElementById('results').innerHTML = `<h2>Error</h2>${response}`
}

function getArrivalHtml(arrival) {
    return `<li>${Math.round(arrival.timeToStation / 60)} minutes: ${arrival.lineName} to ${arrival.destinationName}</li>`;
}

function getArrivalsHtml(arrivals) {
    return `<ul>${arrivals.map(function(arrival) { return getArrivalHtml(arrival); }).join('')}</ul>`;
}

function getDepartureBoardHtml(departureBoard) {
    return `<h3>${departureBoard.stopPoint.commonName}</h3>${getArrivalsHtml(departureBoard.arrivals)}`;
}

function getDepartureBoardsHtml(departureBoards) {
    return `${departureBoards.map(function(board) { return getDepartureBoardHtml(board); }).join('')}`;
}

function updateHtmlWithResults(response) {
    document.getElementById('results').innerHTML = `<h2>Results</h2>${getDepartureBoardsHtml(JSON.parse(response))}`;
}

function updateResults(postcode) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/departureBoards?postcode=${postcode}`, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        console.log(xhttp.status, xhttp.response);
        if (xhttp.status === 200) {
            updateHtmlWithResults(xhttp.response);
        } else {
            updateHtmlWithError(xhttp.response);
        }
    };
    xhttp.send();
}

function onSubmit(form) {
    updateResults(form.postcode.value.replace(/\s/g, ''));
}