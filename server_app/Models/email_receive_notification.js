var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        email: String,
    }
);

var emailReceiveNotification = mongoose.model('email_receive_notification', schema, 'email_receive_notification');

module.exports = emailReceiveNotification;