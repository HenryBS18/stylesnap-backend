import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send({
    'name': 'henry'
  })
})


app.listen(port, () => console.log(`Server up and running on: http://localhost:${port}`));