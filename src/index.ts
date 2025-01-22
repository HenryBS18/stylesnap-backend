import express, { Application, Request, Response } from 'express'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { router } from './routers'
import cors from 'cors'

const app: Application = express()
const port: number = parseInt(process.env.PORT as string, 10)
const protocol: string = process.env.PROTOCOL as string
const host: string = process.env.HOST as string

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'https://3l89513h-5173.asse.devtunnels.ms', 'http://10.1.51.98:5173', 'https://10.1.51.98:5173', 'https://192.168.1.7:5173', 'https://192.168.1.7:4173'],
  credentials: true
}))

app.use('/api', router)

app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Route not found')
})

if (protocol === 'http') {
  app.listen(port, () => console.log(`Server up and running on: http://${host}:${port}`))
} else {
  https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, `${process.env.HOST}-key.pem`)),
    cert: fs.readFileSync(path.resolve(__dirname, `${process.env.HOST}.pem`))
  }, app).listen(port, () => {
    console.log(`HTTPS server up and running on: https://${host}:${port}`);
  })
}