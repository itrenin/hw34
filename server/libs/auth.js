const crypto = require('crypto')
const db = require('../model/db')

module.exports = {
  authorization: (login, cb) => {
    const user = db.get('users').find({ email: login.email }).value()
    // console.log(user)

    if (user) {
      crypto.pbkdf2(
        login.password,
        user.salt,
        1000,
        512,
        'sha512',
        (err, hash) => {
          if (err) {
            return cb(new Error('Возникла ошибка, попробуйте еще!'), null)
          }

          cb(null, {
            login: user.email,
            password: hash.toString('hex') === user.hash,
          })
        }
      )
    } else {
      cb(null, {
        login: null,
        password: null,
      })
    }
  },
  setLogin: (login) => {
    const salt = crypto.randomBytes(16).toString('hex')
    crypto.pbkdf2(login.password, salt, 1000, 512, 'sha512', (err, hash) => {
      db.get('users')
        .push({
          email: login.email,
          salt,
          hash: hash.toString('hex'),
        })
        .write()
    })
  },
}
