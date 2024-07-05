import express, { Router } from "express";
import { prisma } from "../lib/db";
import { Server } from "socket.io";

export default (io: Server): Router => {
  const socket = io.of("/secure");
  const router = express.Router();

  router.get("/", async (req, res) => {
    return res.json("test")
  });

  /*
    * POST /api/person
    * Create a person
    */
  router.post("/", async (req, res) => {
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

    socket.emit('update', {
      type: 'create',
      data: person
    });

    return res.status(200);
  });

  /*
    * DELETE /api/person/:id
    * Delete a person given PersonID
    */
  router.delete("/:id", async (req, res) => {
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

      socket.emit('update', {
        type: 'delete',
        data: person
      });
    } catch {
      return res.status(200);
    }
  });

  return router;
}
