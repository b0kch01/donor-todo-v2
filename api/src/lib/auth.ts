import type { Request, Response, NextFunction } from 'express'
import { getSession } from '@auth/express';
import { decode } from '@auth/core/jwt';

export async function authSession(req: Request, res: Response, next: NextFunction) {
  const session = await getSession(req, { providers: [], });
  res.locals.session = session;
  next();
}

export async function decodeCookie(cookie: string) {
  const cookieObj = new Map<string, string>()
  cookie.split(';').forEach((c) => {
    const [key, value] = c.trim().split('=')
    cookieObj.set(key, value)
  })

  return await decode({
    salt: "authjs.session-token",
    secret: process.env.AUTH_SECRET ?? "",
    token: cookieObj.get("authjs.session-token")
  })
}