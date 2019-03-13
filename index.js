const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const checkMiddleware = (req, res, next) => {
  if (req.body.newAge === null || req.body.newAge === '') {
    return res.redirect(`wrong`)
  }
  return next()
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (_, res) => {
  return res.render(`input`)
})

app.post('/check', checkMiddleware, (req, res) => {
  if (req.body.newAge >= 18) {
    const age = req.body.newAge
    res.render(`major`, { age })
  } else if (req.body.newAge < 18) {
    const age = req.body.newAge
    return res.render(`minor`, { age })
  }
})

app.get('/wrong', (_, res) => {
  return res.render(`wrong`)
})

app.listen(3000)
