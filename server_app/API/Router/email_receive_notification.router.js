var express = require('express')

var router = express.Router()

const emailReceiveNotification = require('../Controller/email_receive_notification.controller')

router.post('/', emailReceiveNotification.postEmail)


module.exports = router