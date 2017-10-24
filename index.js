import express from 'express';
import path from 'path';

import TflApiClient from './apiClients/tflApiClient';
import PostcodesApiClient from './apiClients/postcodesApiClient';
import ArrivalsService from './services/arrivalsService';
import LocationsService from './services/locationsService';
import StopPointsService from './services/stopPointsService';
import DepartureBoardsService from './services/departureBoardsService';

const tflApiClient = new TflApiClient();
const postcodesApiClient = new PostcodesApiClient();
const arrivalsService = new ArrivalsService(tflApiClient);
const locationsService = new LocationsService(postcodesApiClient);
const stopPointsService = new StopPointsService(tflApiClient);
const departureBoardsService = new DepartureBoardsService(arrivalsService, locationsService, stopPointsService);

const app = express();

app.use(express.static('frontend'));
app.use('/history', express.static('frontend/history.html'));

app.get('/departureBoards', (req, res) => {
    const postcode = req.query.postcode;

    if (!postcode) {
        res.status(400).send({errors: ['The `postcode` query parameter must be specified']});
    } else {
        departureBoardsService.getDepartureBoardsForPostcode(postcode, 2, 5)
            .then(departureBoards => {
                if (departureBoards.length) {
                    res.status(200).send(departureBoards);
                } else {
                    res.status(404).send(`No stops found near the postcode ${postcode}`);
                }
            })
            .catch(reason => res.status(reason.status).send(reason));
    }
});

app.listen(3000, () => console.log('\nBusBoard listening on port 3000'));
