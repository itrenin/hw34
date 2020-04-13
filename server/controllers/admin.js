const skillUpdate = require('../libs/updateSkill')
const addProduct = require('../libs/addGoods')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

module.exports = {
  getAdmin: (req, res) => {
    if (!req.session.auth) {
      return res.redirect('/login')
    }
    res.render('admin')
  },
  updateSkill: (req, res) => {
    // console.log(req.body)

    const skill = {
      age: req.body.age,
      concerts: req.body.concerts,
      cities: req.body.cities,
      years: req.body.years,
    }
    skillUpdate.updateSkill(skill, (err) => {
      if (err) {
        req.flash(err.message)
        return res.redirect('/admin')
      }
    })
    res.redirect('/admin')
  },
  addGood: (req, res) => {
    let form = new formidable.IncomingForm()
    console.log(process.cwd())
    let upload = path.join(process.cwd(), './public/assets/img/products')

    if (!fs.existsSync(upload)) {
      fs.mkdirSync(upload)
    }

    form.uploadDir = upload

    form.parse(req, function (err, fields, files) {
      if (err) {
        return next(err)
      }

      const valid = validation(fields, files)

      if (valid.err) {
        fs.unlinkSync(files.photo.path)
        return res.redirect('/admin')
      }

      const fileName = path.join(upload, files.photo.name)

      fs.rename(files.photo.path, fileName, function (err) {
        if (err) {
          console.error(err.message)
          return
        }

        const product = {
          src: `./assets/img/products/${files.photo.name}`,
          name: fields.name,
          price: Number(fields.price),
        }

        addProduct.addProduct(product)

        console.log(product)
      })
    })

    res.redirect('/admin')
  },
}
const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружена картинка!', err: true }
  }
  if (!fields.name) {
    return { status: 'Не указано описание картинки!', err: true }
  }
  return { status: 'Ok', err: false }
}
