
const Carts = require('../../Models/cart')
const Product = require('../../Models/product')
const Sale = require('../../Models/sale')

// Gọi API hiện thị list comment của sản phẩm 
// Phương thức GET
module.exports.index = async (req, res) => {

    try {
        const { id_user } = req.query

        let listCarts = await Carts.find({ id_user: id_user })
        const dataProduct = await Product.find()
        const dataSale = await Sale.find()

        const data = listCarts.map((it) => {
            const product = dataProduct.find(_it => _it._id == it.id_product);
            let checkSale = null
            if (product) {
                itemSale = dataSale.find(_it => _it.id_product == product._id)
                let nowTime = new Date()
                if (itemSale) {
                    if (itemSale.start.getTime() < nowTime.getTime() && nowTime.getTime() < itemSale.end.getTime())
                        checkSale = itemSale;

                }
            }
            const data = {
                _id: it._id,
                id_product: it.id_product,
                id_user: it.id_user,
                count: it.count,
                size: it.size,
                image: product.image,
                price_product: checkSale ? product.price_product * ((100 - checkSale.promotion) / 100) : product.price_product,
                name_product: product.name_product,
            }
            return data;
        })
        res.status(200).json({ message: 'Successfully!', data: data, code: 200 })
    } catch (error) {
        res.status(500).json({ message: 'error!', data: error, code: 500 })
    }

}

// Gửi comment
// Phương Thức Post
module.exports.postCart = async (req, res) => {
    const { id_product, size, count, id_user, id_cart } = req.body
    if (!id_cart) {
        const data = {
            id_product,
            id_user,
            count,
            size
        }
        let itemCart = await Carts.findOne({
            id_product: id_product,
            id_user: id_user,
            size: size
        })
        if (itemCart) {
            await Carts.updateOne({ _id: itemCart._id }, { $set: { count: +(count) + (+itemCart.count) } })
            const cart = await Carts.find({ id_user: id_user })
            res.status(200).json({ message: 'Successfully!', data: cart, code: 200 })
            return
        }
        await Carts.create(data)
        const cart = await Carts.find({ id_user: id_user })
        res.status(200).json({ message: 'Successfully!', data: cart, code: 200 })
    } else {
        console.log("run");
        await Carts.updateOne({ _id: id_cart }, { $set: { count: count } }, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: 'Successfully!', data: result, code: 200 })
            }
        })
    }

}
module.exports.deleteCart = async (req, res) => {
    const { _id } = req.query
    console.log(req.query);
    await Carts.deleteOne({ _id: _id }, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'error!', data: err, code: 500 })
        } else {
            res.status(200).json({ message: 'Successfully!', data: result, code: 200 })
        }
    })
}