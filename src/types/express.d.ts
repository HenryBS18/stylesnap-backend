import { JwtPayload } from 'jsonwebtoken'

declare module 'express' {
  export interface Request {
    token?: JwtPayload
  }
}