//const auth = require('../libs/auth')

/*module.exports = {
  getLogin: (req, res) => {
    if (req.session.auth) {
        return res.redirect('/admin')
      }
    res.render('login', { msglogin: req.flash('login')[0] })
  },
  login: (req, res) => {
    if (req.session.auth) {
      return res.redirect('/admin')
    }

    const login = {
      email: req.body.email,
      password: req.body.password,
    }

    auth.authorization(login, (err, status) => {
      if (err) {
        req.flash('login', err.message)

        return res.redirect('/login')
      }

      if (status.password && login.email === status.login) {
        req.session.auth = status.password
        res.redirect('/admin')
      } else {
        req.flash('login', 'Не правильный логин или пароль')

        return res.redirect('/login')
      }
    })
  },
}*/
const db = require('../model/db')
const crypto = require('crypto')

module.exports.getLogin = async (ctx, next) => {
  //console.log (ctx.session.auth)
  if (ctx.session.auth) {
    ctx.redirect('/admin')
  }
  await ctx.render('template/pages/login')
}
module.exports.login = async (ctx, next) => {
  const login = await ctx.request.body
  // const redirect = '/login'
  // auth.authorization(login, (err, status) => {
  //   if (err) {
  //     console.err('Ошибка авторизации')

  //     //return cb(redirect)
  //   }
  //   if (status.password && login.email === status.login) {
  //     ctx.session.auth = Boolean(status.password)
  //     console.log('редиректим на админку')
  //     console.log(`ctx.session.auth LOGIN = ${ctx.session.auth}`)
  //     //return cb(redirect = '/admin')
  //   } else {
  //     //req.flash('login', 'Не правильный логин или пароль')
  //     console.log('Не правильный логин или пароль')
  //     //return cb(redirect)
  //   }
  // })
  //console.log(redirect)

  const user = db.get('users').find({ email: login.email }).value()
  if (user) {
    const hash = crypto
      .pbkdf2Sync(login.password, user.salt, 1000, 512, 'sha512')
      .toString('hex')
      // console.log(user)
      // console.log(hash)
      if (user.hash === hash){
        ctx.session.auth = Boolean('true')
        ctx.redirect('/admin')
      }
      else {
        ctx.redirect('/login')
      }
  } else {
    ctx.redirect('/login')
  }
}
