import express, { Application } from 'express'
import { clothesRouter, authRouter } from './routers'
import { authMiddleware } from './middlewares/auth.middleware'

const app: Application = express()
const port: number = parseInt(process.env.PORT as string, 10)

app.use(express.json())

app.use('/api/', authRouter)
app.use('/api/clothes', authMiddleware, clothesRouter)

app.use('*', (req, res) => {
  res.status(404).send('Route not found')
})

app.listen(port, () => console.log(`Server up and running on: http://localhost:${port}`));