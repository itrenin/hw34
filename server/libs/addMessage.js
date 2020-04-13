const db = require('../model/db')

module.exports = {
  addMessage: (message, cb) => {
    if (message.name && message.email && message.message) {
      db.get('messages')
        .push({
          name: message.name,
          email: message.email,
          message: message.message,
        })
        .write()
    } else {
      cb(new Error('Все поля должны быть заполнены!'))
    }
  },
}
