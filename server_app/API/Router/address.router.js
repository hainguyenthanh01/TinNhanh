var express = require('express')

var router = express.Router()

const Address = require('../Controller/address.controller')

router.get('/province', Address.province)
router.get('/district', Address.district)
router.get('/wards', Address.wards)


module.exports = router