import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { addCart, deleteCart, updateCart } from "../Redux/Action/ActionCart";
import { changeCount } from "../Redux/Action/ActionCount";
import CartAPI from "../API/CartAPI";
import queryString from "query-string";
import CartsLocal from "../Share/CartsLocal";
import CouponAPI from "../API/CouponAPI";
import { getUserCookie } from '../helper';
import { TiPlus, TiMinus } from "react-icons/ti";

Cart.propTypes = {};

function Cart(props) {
    const dispatch = useDispatch();
    const listCard = useSelector((state) => state.Cart.listCart);
    const id_user = useSelector((state) => state.Session.idUser);
    const [stateTotal, setStateTotal] = useState({
        total: 0,
        subTotal: 0,
    })


    useEffect(async () => {
        const dataRes = await CartAPI.Get_Cart({ id_user: id_user });
        if (dataRes.code == 200) {
            dispatch(addCart(dataRes.data));
        }
    }, []);


    // state get from redux
    const count_change = useSelector((state) => state.Count.isLoad);

    const [total_price, set_total_price] = useState(0);


    // Hàm này dùng để tăng số lượng
    const upCount = async (count, id_cart) => {
        const data = {
            id_cart: id_cart,
            count: parseInt(count) + 1,
        };
        const dataRes = await CartAPI.Post_Cart(data);
        if (dataRes.code == 200) {
            const dataResGet = await CartAPI.Get_Cart({ id_user: id_user });
            if (dataResGet.code == 200) {
                dispatch(addCart(dataResGet.data));
            }
        }

    };

    // Hàm này dùng để giảm số lượng
    const downCount = async (count, id_cart) => {
        if (parseInt(count) === 1) {
            return;
        }

        const data = {
            id_cart: id_cart,
            count: parseInt(count) - 1,
        };
        const dataRes = await CartAPI.Post_Cart(data);
        if (dataRes.code == 200) {
            const dataResGet = await CartAPI.Get_Cart({ id_user: id_user });
            if (dataResGet.code == 200) {
                dispatch(addCart(dataResGet.data));
            }
        }

    };

    // Hàm này dùng để xóa giỏ hàng
    const handler_delete_carts = async (id_cart) => {
        const dataRes = await CartAPI.Delete_Cart({ _id: id_cart });
        if (dataRes.code == 200) {
            const dataResGet = await CartAPI.Get_Cart({ id_user: id_user });
            if (dataResGet.code == 200) {
                dispatch(addCart(dataResGet.data));
            }
        }
    };

    // Hàm này này dùng để kiểm tra đăng nhập checkout
    const [show_error, set_show_error] = useState(false);

    const [show_null_cart, set_show_null_cart] = useState(false);

    const handler_checkout = () => {
        if (getUserCookie()) {
            if (listCard.length < 1) {
                set_show_null_cart(true);
            } else {
                window.location.replace("/checkout");
            }
        } else {
            set_show_error(true);
        }

        setTimeout(() => {
            set_show_error(false);
            set_show_null_cart(false);
        }, 1500);
    };

    // Hàm này dùng để kiểm tra coupon
    const [coupon, set_coupon] = useState("");

    const [discount, setDiscount] = useState(0);
    useEffect(() => {
        if (listCard) {
            const subTotal = listCard.reduce((prev, curIt) => prev + (curIt.price_product) * curIt.count, 0)
            const total = subTotal - discount
            setStateTotal({ ...stateTotal, subTotal: subTotal, total: total })
        }
    }, [listCard, discount])

    const [new_price, set_new_price] = useState(0);

    const [show_success, set_show_success] = useState(false);

    const [errorCode, setErrorCode] = useState(false);

    const handlerCoupon = async (e) => {
        e.preventDefault();

        if (!getUserCookie()) {
            set_show_error(true);
        } else {
            const params = {
                id_user: getUserCookie(),
                code: coupon,
            };

            const query = "?" + queryString.stringify(params);

            const response = await CouponAPI.checkCoupon(query);

            if (response.msg === "Không tìm thấy") {
                setErrorCode(true);
            } else if (response.msg === "Bạn đã sử dụng mã này rồi") {
                setErrorCode(true);
            } else {
                localStorage.setItem("id_coupon", response.coupon._id);
                localStorage.setItem("coupon", JSON.stringify(response.coupon));

                setDiscount((stateTotal.subTotal * response.coupon.promotion) / 100);

                const newTotal =
                    total_price - (total_price * response.coupon.promotion) / 100;

                set_new_price(newTotal);
                set_show_success(true);
            }
        }

        setTimeout(() => {
            set_show_error(false);
            set_show_null_cart(false);
            set_show_success(false);
            setErrorCode(false);
        }, 1500);
    };

    return (
        <div>
            {errorCode && (
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i
                                className="fa fa-bell fix_icon_bell"
                                style={{
                                    fontSize: "40px",
                                    color: "#fff",
                                    backgroundColor: "#f84545",
                                }}
                            ></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: "#fff" }}>
                            Vui Lòng Kiểm Tra Lại Mã!
                        </h4>
                    </div>
                </div>
            )}
            {show_success && (
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i
                                className="fa fa-bell fix_icon_bell"
                                style={{ fontSize: "40px", color: "#fff" }}
                            ></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: "#fff" }}>
                            Áp Dụng Mã Thành Công!
                        </h4>
                    </div>
                </div>
            )}
            {show_error && (
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i
                                className="fa fa-bell fix_icon_bell"
                                style={{
                                    fontSize: "40px",
                                    color: "#fff",
                                    backgroundColor: "#f84545",
                                }}
                            ></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: "#fff" }}>
                            Vui Lòng Kiểm Tra Tình Trạng Đăng Nhập!
                        </h4>
                    </div>
                </div>
            )}
            {show_null_cart && (
                <div className="modal_success">
                    <div className="group_model_success pt-3">
                        <div className="text-center p-2">
                            <i
                                className="fa fa-bell fix_icon_bell"
                                style={{
                                    fontSize: "40px",
                                    color: "#fff",
                                    backgroundColor: "#f84545",
                                }}
                            ></i>
                        </div>
                        <h4 className="text-center p-3" style={{ color: "#fff" }}>
                            Vui Lòng Kiểm Tra Lại Giỏ Hàng!
                        </h4>
                    </div>
                </div>
            )}

            <div className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li>
                                <Link to="/">Trang Chủ</Link>
                            </li>
                            <li className="active">Giỏ hàng</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="Shopping-cart-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="li-product-remove">Xóa</th>
                                                <th className="li-product-thumbnail">Ảnh</th>
                                                <th className="cart-product-name">Sản phẩm</th>
                                                <th className="li-product-price">Giá</th>
                                                <th className="li-product-price">Size</th>
                                                <th className="li-product-quantity">Số lượng </th>
                                                <th className="li-product-subtotal">Tổng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCard &&
                                                listCard.map((value, index) => (
                                                    <tr key={index}>
                                                        <td
                                                            className="li-product-remove"
                                                            onClick={() =>
                                                                handler_delete_carts(value._id)
                                                            }
                                                        >
                                                            <a style={{ cursor: "pointer" }}>
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                        <td className="li-product-thumbnail">
                                                            <Link to={`/detail/${value.id_product}`}>
                                                                <img
                                                                    src={value.image}
                                                                    style={{ width: "5rem" }}
                                                                    alt="Li's Product Image"
                                                                />
                                                            </Link>
                                                        </td>
                                                        <td className="li-product-name">
                                                            <span>{value.name_product}</span>
                                                        </td>
                                                        <td className="li-product-price">
                                                            <span className="amount">
                                                                {new Intl.NumberFormat("vi-VN", {
                                                                    style: "decimal",
                                                                    decimal: "VND",
                                                                }).format(value.price_product) + " VNĐ"}
                                                            </span>
                                                        </td>
                                                        <td className="li-product-price">
                                                            <span className="amount">{value.size}</span>
                                                        </td>
                                                        <td className="quantity">
                                                            {/* <label>Quantity</label> */}
                                                            <div className="cart-plus-minus" style={{justifyContent: "center"}}>
                                                                <div
                                                                    className="dec qtybutton"
                                                                    onClick={() =>
                                                                        downCount(value.count, value._id)
                                                                    }
                                                                >
                                                                    <TiMinus />
                                                                </div>
                                                                <input
                                                                    className="cart-plus-minus-box"
                                                                    value={value.count}
                                                                    type="text"
                                                                />
                                                                <div
                                                                    className="inc qtybutton"
                                                                    onClick={() =>
                                                                        upCount(value.count, value._id)
                                                                    }
                                                                >
                                                                    <TiPlus />

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="product-subtotal">
                                                            <span className="amount">
                                                                {new Intl.NumberFormat("vi-VN", {
                                                                    style: "decimal",
                                                                    decimal: "VND",
                                                                }).format(
                                                                    parseInt(value.price_product) *
                                                                    parseInt(value.count)
                                                                ) + " VNĐ"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="coupon-all">
                                            <div className="coupon">
                                                <input
                                                    id="coupon_code"
                                                    className="input-text"
                                                    onChange={(e) => set_coupon(e.target.value)}
                                                    value={coupon}
                                                    placeholder="Mã giảm giá"
                                                    type="text"
                                                />{" "}
                                                &nbsp;
                                                <input
                                                    className="button"
                                                    value="Áp dụng"
                                                    type="submit"
                                                    onClick={handlerCoupon}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 ml-auto">
                                        <div className="cart-page-total">
                                            <h2>Tổng giỏ hàng</h2>
                                            <ul>
                                                <li>
                                                    Tạm tính{" "}
                                                    <span>
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "decimal",
                                                            decimal: "VND",
                                                        }).format(stateTotal.subTotal) + " VNĐ"}
                                                    </span>
                                                </li>
                                                <li>
                                                    Giảm giá{" "}
                                                    <span>
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "decimal",
                                                            decimal: "VND",
                                                        }).format(discount) + " VNĐ"}
                                                    </span>
                                                </li>
                                                <li>
                                                    Tổng{" "}
                                                    <span>
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "decimal",
                                                            decimal: "VND",
                                                        }).format(stateTotal.total) + " VNĐ"}
                                                    </span>
                                                </li>
                                            </ul>
                                            <a
                                                style={{
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                }}
                                                onClick={handler_checkout}
                                            >
                                               Tiến hành đặt hàng
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
