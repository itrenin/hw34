const express = require('express')

const controllerIndex = require('../controllers/index')
const controllerLogin = require('../controllers/login')
const controllerAdmin = require('../controllers/admin')

const router = express.Router()

router.get('/', controllerIndex.getIndex)
router.post('/', controllerIndex.sendMail)
router.get('/login', controllerLogin.getLogin)
router.post('/login', controllerLogin.login)
router.get('/admin', controllerAdmin.getAdmin)
router.post('/admin/skills', controllerAdmin.updateSkill)
router.post('/admin/upload', controllerAdmin.addGood)


module.exports = router
