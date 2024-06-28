import 'dotenv/config'

import { ExpressAuth, getSession, Session } from "@auth/express";

import express from "express";
import type { Request, Response, NextFunction } from 'express'

const app = express();
const port = 3001;

export async function authSession(req: Request, res: Response, next: NextFunction) {
  const session = await getSession(req, { providers: [], });
  res.locals.session = session;
  next();
}

app.set('trust proxy', true);
app.use("/auth/*", ExpressAuth({ providers: [] }));
app.use(authSession);

app.get('/', (req: Request, res: Response) => {
  const { session } = res.locals;

  res.send({
    message: 'Hello World!',
    session: session?.user ?? null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});