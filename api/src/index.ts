import 'dotenv/config';
import cors from 'cors';
import express from "express";

import { Server } from "socket.io";

import { createServer } from 'http';
import { setupSocketIO } from './api/websocket';
import personRouter from './api/person';
import { wakeUpDatabase } from './lib/db';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.TRUSTED_CLIENT,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

setupSocketIO(io);

const port = 3001;

app.set('trust proxy', true);
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());

// Routes
app.use('/api/person', personRouter(io));

httpServer.listen(port, () => {
  console.log(`[✅] POC Server running at http://localhost:${port}/`);
  wakeUpDatabase();
});