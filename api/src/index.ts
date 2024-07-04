import 'dotenv/config';
import cors from 'cors';
import express from "express";

import { Server } from "socket.io";
import { decodeCookie } from './lib/auth';

import { Person, PrismaClient } from '@prisma/client'
import { createServer } from 'http';

const prisma = new PrismaClient()
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const secureNamespace = io.of("/secure");

const port = 3001;

app.set('trust proxy', true);
app.use(cors({ origin: true, credentials: true }))
app.use(express.json());

app.get('/', (req, res) => {
  const { session } = res.locals;

  if (!session?.user) {
    res.status(401).send({ message: 'Unauthorized;' });
  }

  res.send({
    message: 'Hello World!',
    cookie: req.cookies ?? null,
    session: session?.user ?? null,
  });
});

app.post("/api/person", async (req, res) => {
  const { session } = res.locals;

  if (!session?.user) {
    res.status(401).send({ message: 'Unauthorized;' });
  }

  console.log("Creating person", req.body);

  const { FirstName, LastName, Address, City } = req.body;
  const person = await prisma.person.create({
    data: {
      FirstName,
      LastName,
      Address,
      City
    }
  });

  secureNamespace.emit('update', {
    type: 'create',
    data: person
  });

  res.status(200);
});

app.delete("/api/person/:id", async (req, res) => {
  const { session } = res.locals;

  if (!session?.user) {
    res.status(401).send({ message: 'Unauthorized;' });
  }


  try {
    console.log("Deleting person", req.params.id);
    const person = await prisma.person.delete({
      where: {
        PersonID: parseInt(req.params.id)
      }
    });

    secureNamespace.emit('update', {
      type: 'delete',
      data: person
    });
  } catch {
    res.status(200);
  }
});

secureNamespace.use(async (socket, next) => {
  if (!socket.handshake.headers.cookie) {
    return next(new Error("No cookie"));
  }

  let payload = await decodeCookie(socket.handshake.headers.cookie)
  console.log("Middleware Check:", payload?.email)

  if (payload?.email != "nhchoi@stanford.edu") {
    return next(new Error("Not authenticated"));
  }

  next();
});

secureNamespace.on('connection', async (socket) => {
  const users = await prisma.person.findMany();
  socket.emit('update', { type: 'set', data: users });

  socket.on('update', (data) => {
    console.log('update', data);
    secureNamespace.emit('update', "sent back: " + data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`POC Server running at http://localhost:${port}/`);
});