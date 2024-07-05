import { Server, Socket } from "socket.io"
import { prisma } from "../lib/db";
import { decodeCookie } from "../lib/auth";

const setupSecure = (io: Server) => {
  const secureNamespace = io.of("/secure");

  secureNamespace.use(async (socket, next) => {
    if (!socket.handshake.headers.cookie) {
      return next(new Error("No cookie"));
    }

    let payload = await decodeCookie(socket.handshake.headers.cookie)
    console.log("[⚡] Websocket Handshake:", payload?.email)

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
}

export const setupSocketIO = (io: Server) => {
  setupSecure(io);
}