import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { matchRouter } from './routes/match.route';
import { playerRouter } from './routes/player.route';
import { eventRouter } from './routes/event.route';
import { teamRouter } from './routes/team.route';

import { config } from './config';

const app = express();

// CORS
app.use(cors(
  {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  }
));

// Middleware
app.use(bodyParser.json());

//a method to print the request and response
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.path}`);
  //data
  console.log(req.body);
  next();
});

// Routes
app.use('/matches', matchRouter);
app.use('/players', playerRouter);
app.use('/events', eventRouter);
app.use('/teams', teamRouter);

// Connect to MongoDB
mongoose
  .connect(config.db)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export { app };
  
//command to run the node with index.hs typescipt
//npx ts-node src/index.ts
