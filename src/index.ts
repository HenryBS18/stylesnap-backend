import express, { Application, Request, Response } from 'express'
import { router } from './routers'
import cors from 'cors'

const app: Application = express()
const port: number = parseInt(process.env.PORT as string, 10)

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api', router)

app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Route not found')
})

app.listen(port, () => console.log(`Server up and running on: http://localhost:${port}`))