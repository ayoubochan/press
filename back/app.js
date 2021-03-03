const express = require('express')
const app = express()
// const connexion = require('../conf.js');
const bodyParser = require('body-parser');
const port = 8000
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})