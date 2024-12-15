import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const secret: string = process.env.JWT_SECRET!

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.replace('session=', '')

  if (!token) {
    res.status(401).send({
      message: 'Token is required'
    })
    return
  }

  try {
    const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload
    req.token = decodedToken
    next()
  } catch (error) {
    res.status(401).send({
      message: 'Invalid token'
    })
    return
  }
}