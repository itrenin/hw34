const auth = require('../libs/auth')

module.exports = {
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
}
