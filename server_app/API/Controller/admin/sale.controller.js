const Sale = require('../../../Models/sale')
const Comment = require('../../../Models/comment')


module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    const keyWordSearch = req.query.search;

    const perPage = parseInt(req.query.limit) || 8;
    const totalPage = Math.ceil(await Sale.countDocuments() / perPage);

    let start = (page - 1) * perPage;
    let end = page * perPage;

    const sale = await Sale.find().populate('id_product');
    // db.createView( "sales", "sale", [
    //     {
    //        $lookup:
    //           {
    //              from: "product",
    //              localField: "id_product",
    //              foreignField: "id_product",
    //              as: "productDocs"
    //           }
    //     },
    //     {
    //        $project:
    //           {
    //             _id: 0,
    //             name: "productDocs.name_product",
    //             promotion: 1,
    //             describe: 1,
    //             start: 1,
    //             end: 1,
    //             status: 1,
    //           }
    //     },
    //        { $unwind: "$name" }
    //  ] )
    if (!keyWordSearch) {
        res.json({
            sale: sale.slice(start, end),
            totalPage: totalPage
        })

    } else {
        var newData = sale.filter(value => {
            return value.id.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.json({
            sale: newData.slice(start, end),
            totalPage: totalPage
        })
    }
}

module.exports.create = async (req, res) => {

    const check = await Sale.find({ id_product: req.body.id_product })

    let flag = false

    check.forEach(value => {
        if (value.status === true) {
            flag = true
        }
    })

    if (flag) {
        res.send("Sản phẩm này đã có khuyến mãi")
    } else {
        await Sale.create(req.body)

        res.send("Bạn đã thêm thành công")
    }

}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const sale = await Sale.findOne({ _id: id })

    res.json(sale)

}

module.exports.update = async (req, res) => {

    const id = req.params.id

    const sale = await Sale.findOne({ _id: id })

    sale.promotion = req.body.promotion
    sale.describe = req.body.describe
    sale.status = req.body.status
    sale.id_product = req.body.id_product

    sale.save()

    res.json("Bạn đã cập nhật thành công")

}

module.exports.delete = async (req, res) => {

    const id = req.params.id

    await Sale.deleteOne({ _id: id })

    res.json("Thanh Cong")

}

module.exports.list = async (req, res) => {

    const sale = await Sale.find({ status: true }).populate('id_product')
    let nowTime = new Date()
    let data = []
    const dataSend = sale.filter(it => {
        return it.start.getTime() < nowTime.getTime() && nowTime.getTime() < it.end.getTime()
    })
    for (let i = 0; i < dataSend.length; i++) {
        const listStar = await Comment.find({ id_product: dataSend[i].id_product._id })
        console.log(listStar);
        if (listStar && listStar.length > 0) {
            const averageStar = listStar.reduce((sum, item) => sum + item.star, 0) / listStar.length;
            data.push({
                ...dataSend[i]._doc,
                star: Number(parseFloat(averageStar.toFixed(1)))
            })

        } else {
            data.push({
                ...dataSend[i]._doc,
                star: 0
            })
        }
    }
    res.json(data)

}

module.exports.detailList = async (req, res) => {

    const id = req.params.id

    const sale = await (await Sale.findOne({ id_product: id, status: true }).populate('id_product'));

    if (sale) {
        res.json({
            msg: "Thanh Cong",
            sale: sale
        })
    } else {
        res.json({
            msg: "That Bai"
        })
    }
}