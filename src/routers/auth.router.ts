import express, { Router, Request, Response } from 'express'
import { AuthService } from '../services'

const userService: AuthService = new AuthService()
export const authRouter: Router = express.Router()

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body

    const token: string = await userService.register({
      firstName,
      lastName,
      email,
      password
    })

    res.cookie('session', token).status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const token: string = await userService.login({ email, password })

    res.cookie('session', token).status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: error.message
      })
    }
  }
})

authRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    res.status(200).clearCookie('session').send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        message: 'Failed to log out'
      })
    }
  }
})