import express, { type NextFunction, type Request, type Response } from 'express';
import { getSession } from "@auth/express";

const app = express();
const port = 3001;

export function authSession(req: Request, res: Response, next: NextFunction) {
  res.locals.session = getSession(req, { providers: [] });
  next();
}

// app.use(authSession);

app.get('/', (req: Request, res: Response) => {
  const { session } = res.locals;
  res.send({
    message: 'Hello World!',
    session: session ?? null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});