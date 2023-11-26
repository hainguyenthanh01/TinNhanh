var express = require('express')

var router = express.Router()

const Address = require('../Controller/address.controller')

router.get('/province', Address.province)
router.post('/district', Address.district)
router.delete('/wards', Address.wards)


module.exports = router