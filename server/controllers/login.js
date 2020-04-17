const auth = require('../libs/auth')

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

module.exports.getLogin = async (ctx, next) => {
  //console.log (ctx.session.auth)
  if (ctx.session.auth) {
    ctx.redirect('/admin')
  }
  await ctx.render('template/pages/login')
}
module.exports.login = async (ctx, next) => {
  const login = await ctx.request.body
  const redirect = 'login'
  auth.authorization(login, (err, status) => {
    if (err) {
      console.err('Ошибка авторизации')

      return ctx.redirect('/login')
    }
    if (status.password && login.email === status.login) {
      ctx.session.auth = status.password
      console.log('редиректим на админку')
      console.log(`ctx.session.auth LOGIN = ${ctx.session.auth}`)
      return ctx.redirect('/admin')
    } else {
      //req.flash('login', 'Не правильный логин или пароль')
      console.log('Не правильный логин или пароль')
      return ctx.redirect('/login')
    }
  })
}
