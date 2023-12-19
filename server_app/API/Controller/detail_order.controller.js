const Detail_Order = require("../../Models/detail_order");
const Product = require("../../Models/product");
const Order = require("../../Models/order");
const Coupon = require("../../Models/coupon");

// Hiển thị chi tiết hóa đơn
// Phương thức GET
module.exports.detail = async (req, res) => {
  const id_order = req.params.id;

  const detail_order = await Detail_Order.find({ id_order: id_order }).populate(
    "id_product"
  );

  res.json(detail_order);
};

// Phuong Thuc Post
module.exports.post_detail_order = async (req, res) => {
  console.log(req.body);
  const product = await Product.findOne({ _id: req.body.id_product });

  if (req.body.count > product.number) {
    Order.deleteOne({ _id: req.body.id_order });
    res.status(200).json({
      code: 201,
      message: "số lượng trong kho không đủ, vui lòng chọn ít hơn!",
      status: false,
    });
  } else {
    const detail_order = await Detail_Order.create(req.body);
    const data = await Product.updateOne(
      { _id: req.body.id_product },
      { $set: { number: product.number - req.body.count } }
    );
    res.status(200).json({ code: 200, message: "Thành công" });
  }
};
