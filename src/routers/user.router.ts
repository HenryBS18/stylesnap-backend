import express, { Router, Request, Response } from 'express'
import { UserService } from '../services'

const userService: UserService = new UserService()
export const userRouter: Router = express.Router()

userRouter.post('/register', async (req: Request, res: Response) => {
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
        error: error.message
      })
    }
  }
})

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const token: string = await userService.login(email, password)

    res.cookie('session', token).status(200).send()
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({
        error: error.message
      })
    }
  }
})