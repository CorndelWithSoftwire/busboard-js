import express from 'express';
import TflApiClient from './apiClients/tflApiClient';
import PostcodesApiClient from './apiClients/postcodesApiClient';
import ArrivalsService from './services/arrivalsService';
import LocationsService from './services/locationsService';
import StopPointsService from './services/stopPointsService';
import DepartureBoardsService from './services/departureBoardsService';
import ConsoleRunner from './consoleRunner';

const tflApiClient = new TflApiClient();
const postcodesApiClient = new PostcodesApiClient();
const arrivalsService = new ArrivalsService(tflApiClient);
const locationsService = new LocationsService(postcodesApiClient);
const stopPointsService = new StopPointsService(tflApiClient);
const departureBoardsService = new DepartureBoardsService(arrivalsService, locationsService, stopPointsService);

const consoleRunner = new ConsoleRunner(departureBoardsService);
consoleRunner.runForever();
