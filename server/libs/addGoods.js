const db = require('../model/db')

module.exports = {
  addProduct: (product) => {
    db.get('products').push({ src: product.src, name: product.name, price: product.price}).write()
  },
}
