$(document).ready(function () {
    var form = $('#postcode-form');
    var results = $('#results');

    form.submit(function (event) {
        event.preventDefault();
        results.empty();
        loadResults(this.postcode.value);
    });

    function loadResults(postcode) {
        $.get('/departureBoards', {postcode: postcode})
            .done(function (data) {
                displayResults(data);
            })
            .fail(function (error) {
                console.log(error);
                displayError(error);
            });
    }

    function displayResults(data) {
        $('<h2/>').text('Results').appendTo(results);
        data.forEach(function (board) {
            displayBoard(board);
        });
    }

    function displayBoard(board) {
        $('<h3/>').text(board.stopPoint.commonName).appendTo(results);
        var list = $('<ul/>');
        board.arrivals.forEach(function (arrival) {
            $('<li/>').text(`${Math.round(arrival.timeToStation / 60)} minutes: ${arrival.lineName} to ${arrival.destinationName}`).appendTo(list);
        });
        list.appendTo(results);
        list.hide().slideDown();
    }

    function displayError(error) {
        $('<h2/>').text('Error').appendTo(results);
        $('<div/>').text(err).appendTo(results);
    }
});
