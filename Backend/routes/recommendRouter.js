import express from 'express'
import { getRecommendations } from '../controllers/recommendController.js';


const recommendRouter = express.Router();


recommendRouter.get('/user/:userId', getRecommendations);


export default recommendRouter;

