const db = require('../model/db')
const addMessage = require('../libs/addMessage')

module.exports = {
  getIndex: (req, res) => {
    const data = {
      skills: db.get('skills').value() || [],
      products: db.get('products').value() || [],
    }
    res.render('index', data)
  },
  sendMail: (req, res) => {
    const data = req.body
    addMessage.addMessage(data, err => {
      if (err) {
        req.flash(err.message)
        return res.redirect('/')
      }
    })
    //console.log(data)
    res.redirect('/')
  }
}
