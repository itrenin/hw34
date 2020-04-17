const db = require('../model/db')
const addMessage = require('../libs/addMessage')

module.exports.getIndex = async (ctx, next) => {
  const data = {
    skills: db.get('skills').value() || [],
    products: db.get('products').value() || [],
  }
  await ctx.render('template/pages/index', data)
  //await ctx.body('./template/pages/index.pug')
}
module.exports.sendMail = async (ctx) => {
  const data = await ctx.request.body
  addMessage.addMessage(data, (err) => {
    if (err) {
      ctx.response.flash(err.message)
    }
  })

  await ctx.redirect('/')
}
