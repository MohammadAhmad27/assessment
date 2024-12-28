import express from 'express';
import { getAllMovies, getMovieById } from '../controllers/movies.controllers.js';
const router = express.Router();

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById );

export default router;