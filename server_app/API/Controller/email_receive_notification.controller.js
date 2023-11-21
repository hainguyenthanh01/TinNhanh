
const emailReceiveNotification = require('../../Models/email_receive_notification')




// Phương Thức Post
module.exports.postEmail = async (req, res) => {
    const { email } = req.body
    const checkemail = await emailReceiveNotification.findOne({ email: email })
    if (!email) {
        res.status(200).json({ message: 'vui lòng nhập email!', code: 500 })
    } else if (checkemail) {
        res.status(200).json({ message: 'email đã tồn tại!', code: 500 })
    } else {
        await emailReceiveNotification.create({ email })
        res.status(200).json({ message: 'Successfully!', code: 200 })
    }

}
