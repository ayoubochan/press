const express = require('express')
const app = express()
const connexion = require('./conf.js');
const bodyParser = require('body-parser');
const port = 5000
const cors = require('cors')
const path = require('path')

  app.use(cors({
    origin: '*'
  }))
  
  app.use(bodyParser.json({limit: '10mb'}))
  app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))
  
  
  app.get('/api/articles', (req, res) => {
    console.log('Ok')
    connexion.query(`SELECT * FROM articles ORDER BY id DESC`, (err, result) => {
      if (err) res.sendStatus(400)
      else {
          res.json(result)
  
      }
    })
  })
  
  app.post('/api/category', (req, res) => {
    connexion.query(`SELECT * FROM articles WHERE categories LIKE '%${req.body.category}%' ORDER BY id DESC`, (err, result) => {
      if (err) res.sendStatus(400)
      else {
        if(result.length === 0) res.sendStatus(400)
        else res.json(result)
  
      }
    })
  })
  
  app.post('/api/article', (req, res) => {
    connexion.query(`SELECT date, categories, keywords FROM articles WHERE id='${req.body.id}' AND keywords='${req.body.keywords}'`, (err, response) => {
      if (err) res.sendStatus(400)
      else {
        if(response.length === 0) return res.sendStatus(400)
        connexion.query(`SELECT * FROM elements WHERE id_article='${req.body.id}'`, (err, result) => {
          if (err) res.sendStatus(400)
          else {
              connexion.query(`SELECT * FROM articles WHERE id!='${req.body.id}' ORDER BY id DESC LIMIT 0, 30`, (err, results) => {
                if (err) res.sendStatus(400)
                else {
                    res.json({
                      structure: result.sort((a, b) => parseFloat(a.place) - parseFloat(b.place)),
                      suggestions: results,
                      date: response[0].date,
                      categories: response[0].categories
                    })
            
                }
              })
      
          }
        })
      }
    })
  })
  
  app.post('/api/register', (req, res) => {
    connexion.query(`INSERT INTO users (email)
    VALUES ('${req.body.email}')`, (err, result) => {
      if(err) res.json(err)
      else {
        res.json('ok')
      }
    })
  })
  
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front/public/index.html'))
  })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})