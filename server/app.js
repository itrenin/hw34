// const express = require('express')
// const path = require('path')
// const bodyParser = require('body-parser')
// const flash = require('connect-flash')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')

// const app = express()

// // console.log(path.join(__dirname, '../source/template/pages'))
// app.set('views', path.join(__dirname, '../source/template/pages'))
// app.set('view engine', 'pug')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(
//   session({
//     secret: 'secretKey',
//     key: 'key',
//     cookie: {
//       path: '/',
//       httpOnly: true,
//       maxAge: 30 * 60 * 1000,
//     },
//     saveUninitialized: true,
//     resave: true,
//   })
// )
// app.use(cookieParser())
// app.use(flash())
// app.use(express.static(path.join(__dirname, '../public')))

// app.use('/', require('./routes'))

// app.listen(3000, () => {
//   console.log('Сервер запущен на порту 3000')
// })

const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const session = require('koa-session')
const Pug = require('koa-pug')

const pug = new Pug({
  viewPath: path.join(__dirname, './source'),
  pretty: false,
  basedir: path.join(__dirname, './source'),
  noCache: true,
  app: app, // equals to pug.use(app) and app.use(pug.middleware)
})
const errorHandler = require('./libs/error')
const config = require('./config')
const router = require('./routes')

app.use(static(path.join(__dirname, '../public')))
app.use(errorHandler)
//app.use ()

app.on('error', (err, ctx) => {
  console.log(err)
  ctx.request
  ctx.response.body = err
  ctx.render('error', {
    status: ctx.response.status,
    error: ctx.response.message,
  })
})

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  if (!fs.existsSync(path.join(__dirname, config.upload))) {
    fs.mkdirSync(path.join(__dirname, config.upload))
  }
  console.log('Сервер запущен на порту 3000')
  //console.log(path.join(__dirname, './source/template/pages'))
})
