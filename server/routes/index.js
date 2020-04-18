// const express = require('express')

// const controllerIndex = require('../controllers/index')
// const controllerLogin = require('../controllers/login')
// const controllerAdmin = require('../controllers/admin')

// const router = express.Router()

// router.get('/', controllerIndex.getIndex)
// router.post('/', controllerIndex.sendMail)
// router.get('/login', controllerLogin.getLogin)
// router.post('/login', controllerLogin.login)
// router.get('/admin', controllerAdmin.getAdmin)
// router.post('/admin/skills', controllerAdmin.updateSkill)
// router.post('/admin/upload', controllerAdmin.addGood)

const Router = require('koa-router')
const path = require('path')
const router = new Router()
const koaBody = require('koa-body')
const controllers = require('../controllers')

router.get('/', controllers.index.getIndex)
router.post('/', koaBody(), controllers.index.sendMail)

router.get('/login', controllers.login.getLogin)
router.post('/login', koaBody(), controllers.login.login)

router.get('/admin', controllers.admin.getAdmin)
router.post('/admin/skills', koaBody(), controllers.admin.updateSkill)
router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(process.cwd(), 'public/assets/uploads'),
      keepExtensions: true,
    },
  }),
  controllers.admin.addGood
)

module.exports = router
