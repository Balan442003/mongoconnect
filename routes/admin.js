var express = require("express");
var router = express.Router();
var adminController = require('../controller/adminController')

router.get('/', adminController.get)
router.post('/', adminController.post)
router.post('/login', adminController.login)


module.exports = router