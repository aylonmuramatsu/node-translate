import { Router } from 'express'
import TranslateController from './app/controller/TranslateController';

let routes = Router();

routes.post('/', TranslateController.index);

export default routes;