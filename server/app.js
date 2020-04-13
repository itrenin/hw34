const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()

// console.log(path.join(__dirname, '../source/template/pages'))
app.set('views', path.join(__dirname, '../source/template/pages'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  session({
    secret: 'secretKey',
    key: 'key',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
    saveUninitialized: true,
    resave: true,
  })
)
app.use(cookieParser())
app.use(flash())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', require('./routes'))

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000')
})
