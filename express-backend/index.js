import express from 'express';
import moviesRouter from './routes/movies.routes.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api', moviesRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
