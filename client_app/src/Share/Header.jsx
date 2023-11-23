import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Cart from "../API/CartAPI";
import User from "../API/User";
import logo from "../Image/biglogo.svg";
import { addCart, addUser, deleteCart } from "../Redux/Action/ActionCart";
import { changeCount } from "../Redux/Action/ActionCount";
import { addSession, deleteSession } from "../Redux/Action/ActionSession";
import queryString from "query-string";
import Product from "../API/Product";
import { addSearch } from "../Redux/Action/ActionSearch";
import CartsLocal from "./CartsLocal";
import { FaUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { TiShoppingCart } from "react-icons/ti";
import { FaFacebook, FaTiktok  } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { SiShopee } from "react-icons/si";
import { getUrlParamsFromJson, getUserCookie } from '../helper';

function Header(props) {
  // State count of cart
  const [count_cart, set_count_cart] = useState(0);

  const [total_price, set_total_price] = useState(0);

  const [carts_mini, set_carts_mini] = useState([]);
  const location = useLocation();
  const listCard = useSelector((state) => state.Cart.listCart);
  const [countCart, setCountCart] = useState(0);

  const id_user = useSelector((state) => state.Session.idUser);

  // Hàm này để khởi tạo localStorage dùng để lưu trữ giỏ hàng
  // Và nó sẽ chạy lần đầu
  useEffect(async () => {
    if (localStorage.getItem("carts") !== null) {
      set_carts_mini(JSON.parse(localStorage.getItem("carts")));
    } else {
      localStorage.setItem("carts", JSON.stringify([]));
    }
  }, []);

  // Xử lý thanh navigation
  const [header_navbar, set_header_navbar] = useState(
    "header-bottom header-sticky"
  );

  window.addEventListener("scroll", () => {
    if (window.pageYOffset < 200) {
      set_header_navbar("header-bottom header-sticky");
    } else {
      set_header_navbar(
        "header-bottom header-sticky offset_navigation animate__animated animate__fadeInUp"
      );
    }
  });

  const dispatch = useDispatch();

  //Sau khi F5 nó sẽ kiểm tra nếu phiên làm việc của Session vẫn còn thì nó sẽ tiếp tục
  // đưa dữ liệu vào Redux
  if (getUserCookie()) {
    const action = addSession(getUserCookie());
    dispatch(action);
  }

  // Get carts từ redux khi user chưa đăng nhập
  // const carts = useSelector(state => state.Cart.listCart)

  const [active_user, set_active_user] = useState(false);

  const [user, set_user] = useState({});

  // Hàm này dùng để hiện thị
  useEffect(async () => {
    if (!id_user) {
      // user chưa đăng nhâp

      set_active_user(false);
    } else {
      // user đã đăng nhâp

      const fetchData = async () => {
        const response = await User.Get_User(getUserCookie());
        set_user(response);
      };

      fetchData();

      set_active_user(true);
      const dataRes = await Cart.Get_Cart({ id_user: id_user });
      if (dataRes.code == 200) {
        dispatch(addCart(dataRes.data));
      }
    }
  }, [id_user]);

  // Hàm này dùng để xử lý phần log out
  const handler_logout = () => {
    const action = deleteSession("");
    dispatch(action);

    sessionStorage.clear();
  };

  // Get trạng thái từ redux khi user chưa đăng nhập
  const count = useSelector((state) => state.Count.isLoad);

  // Hàm này dùng để load lại dữ liệu giỏ hàng ở phần header khi có bất kì thay đổi nào
  // Phụ thuộc vào thằng redux count
  useEffect(() => {
    if (count) {
      showData(JSON.parse(localStorage.getItem("carts")), 0, 0);

      const action = changeCount(count);
      dispatch(action);
    }
  }, [count]);
  useEffect(() => {
    if (listCard) {
      const numberProduct = listCard.reduce(
        (numprev, item) => numprev + item.count,
        0
      );
      setCountCart(numberProduct);
    }
  }, [listCard]);

  // Hàm này là hàm con chia ra để xử lý
  function showData(carts, sum, price) {
    carts.map((value) => {
      sum += value.count;
      price += parseInt(value.price_product) * parseInt(value.count);
    });

    set_count_cart(sum);

    set_total_price(price);

    set_carts_mini(carts);
  }

  // Hàm này dùng để xóa carts_mini
  const handler_delete_mini = (id_cart) => {
    CartsLocal.deleteProduct(id_cart);

    const action_change_count = changeCount(count);
    dispatch(action_change_count);
  };
  let history = useHistory();
  const [male, set_male] = useState([]);
  const [female, set_female] = useState([]);

  // Gọi API theo phương thức GET để load category
  useEffect(() => {
    const fetchData = async () => {
      // gender = male
      const params_male = {
        gender: "male",
      };

      const query_male = "?" + queryString.stringify(params_male);

      const response_male = await Product.Get_Category_Gender(query_male);

      set_male(response_male);

      // gender = female
      const params_female = {
        gender: "female",
      };

      const query_female = "?" + queryString.stringify(params_female);

      const response_female = await Product.Get_Category_Gender(query_female);

      set_female(response_female);
    };

    fetchData();
  }, []);

  // state keyword search
  const [keyword_search, set_keyword_search] = useState("");

  const [products, set_products] = useState([]);


  // Hàm này trả ra list product mà khách hàng tìm kiếm
  // sử dụng useMemo để performance hơn vì nếu mà dữ liệu mới giống với dữ liệu cũ thì nó sẽ lấy cái
  // Không cần gọi API để tạo mới data


  const handler_search = (e) => {
    e.preventDefault();

    // Đưa vào redux để qua bên trang search lấy query tìm kiếm
    const action = addSearch(keyword_search);
    dispatch(action);

    window.location.replace("/search");
  };
  useEffect(() => {
    if (keyword_search) {
      const queryParams = getUrlParamsFromJson({ name: keyword_search })
      const url = `http://localhost:8000/api/Product/?${queryParams}`
      if (keyword_search) {
        fetch(url,
          {
            method: "GET", headers: {
              "Content-Type": "application/json",
            }
          }).then(response => response.json())
          .then(res => {
            if (res.code === 200) {
              set_products(res.data);
            }
          })
      }
    }
  }, [keyword_search])

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4" style={{width: "270px"}}>
              <li>
                <span>Telephone Enquiry:</span>
                <a href="#">(+84) 392 136 898</a>
              </li>
            </div>
            <div className="col-lg-9 col-md-8">
              <ul className="d-flex align-items-center" >
                <li className="icon-contact">
                  <a href="https://www.facebook.com/buli2019" style={{ fontSize: "14px" }} target="_blank">
                    <FaFacebook/>
                  </a>
                </li>
                <li className="icon-contact">
                  <a href="https://www.instagram.com/buli_official/" style={{ fontSize: "14px" }} target="_blank">
                    <GrInstagram/>
                  </a>
                </li>
                <li className="icon-contact">
                  <a href="https://www.tiktok.com/@bulishop" style={{ fontSize: "14px" }} target="_blank">
                    <FaTiktok/>
                  </a>
                </li>
                <li className="icon-contact">
                  <a href="https://shopee.vn/bulishop" style={{ fontSize: "14px" }} target="_blank">
                    <SiShopee/>
                  </a>
                </li>
                <li className="icon-contact">
                  <a href="https://buli.vn/" style={{ fontSize: "14px" }} target="_blank">
                    <FaEarthAsia />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
        <div className="container pb_header">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo pb-sm-30 pb-xs-30">
                <Link to="/">
                  <img src={logo} style={{ width: "10rem" }} />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15 d-flex justify-content-between align-items-center">
              <form
                action="/search"
                className="hm-searchbox"
                onSubmit={handler_search}
              >
                <input
                  type="text"
                  placeholder="Enter your search key ..."
                  value={keyword_search}
                  onChange={(e) => set_keyword_search(e.target.value)}
                />
                <button type="submit" style={{ height: "45px" }} class="btn btn-primary">
                  <i class="fa fa-search"></i>
                </button>
                {keyword_search && (
                  <div className="show_search_product">
                    {products &&
                      products.map((value) => (
                        <div
                          className="hover_box_search d-flex"
                          key={value._id}
                        >
                          <Link
                            to={`/detail/${value._id}`}
                            style={{ padding: ".8rem" }}
                          >
                            <img
                              className="img_list_search"
                              src={value.image}
                              alt=""
                            />
                          </Link>

                          <div
                            className="group_title_search"
                            style={{ marginTop: "2.7rem" }}
                          >
                            <h6 className="title_product_search">
                              {value.name_product}
                            </h6>
                            <span className="price_product_search">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "decimal",
                                decimal: "VND",
                              }).format(value.price_product) + " VNĐ"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </form>
              <li>
                <div className="ht-setting-trigger">
                  <FaUserCircle
                    style={{ marginRight: "5px", marginTop: "-4px" }}
                  />
                  {active_user ? (
                    <span
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      style={{ fontWeight: "bold" }}
                    >
                      {user.fullname}
                    </span>
                  ) : (
                    <span
                      data-toggle="collapse"
                      data-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      style={{ fontWeight: "bold" }}
                    >
                      Profile
                    </span>
                  )}
                </div>
                <div className="ul_setting">
                  {active_user ? (
                    <ul className="setting_ul collapse" id="collapseExample">
                      <li className="li_setting">
                        <Link
                          to={`/profile/${getUserCookie()}`}
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="li_setting">
                        <Link to="/history">Order Status</Link>
                      </li>
                      <li className="li_setting">
                        <a
                          onClick={() => {
                            handler_logout();
                            history.push("/");
                          }}
                          href="#"
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  ) : (
                    <ul className="setting_ul collapse" id="collapseExample">
                      <li className="li_setting">
                        <Link to="/signin">Sign In</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            </div>
          </div>
        </div>
        <div className={header_navbar}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="hb-menu">
                  <nav>
                    <ul>
                      <li className="dropdown-holder">
                        <Link
                          className={`${location.pathname === "/" ? "active" : ""
                            }`}
                          to="/"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="megamenu-holder">
                        <Link
                          className={`${location.pathname.includes("/shop") ? "active" : ""
                            }`}
                          to="/shop/all"
                        >
                          Menu
                        </Link>
                        <ul class="megamenu hb-megamenu">
                          <li>
                            <Link to="/shop/all">Male</Link>
                            <ul>
                              {male &&
                                male.map((value) => (
                                  <li key={value._id}>
                                    <Link
                                      to={`/shop/${value._id}`}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {value.category}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                          <li>
                            <Link to="/shop">Female</Link>
                            <ul>
                              {female &&
                                female.map((value) => (
                                  <li key={value._id}>
                                    <Link
                                      to={`/shop/${value._id}`}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {value.category}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link
                          className={`${location.pathname.includes("/event") ? "active" : ""
                            }`}
                          to="/event"
                        >
                          Event
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${location.pathname.includes("/contact")
                            ? "active"
                            : ""
                            }`}
                          to="/contact"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`${location.pathname.includes("/about")
                            ? "active"
                            : ""
                            }`}
                          to="/about"
                        >
                          About Us
                        </Link>
                      </li>
                    </ul>
                    <div
                      className="header-cart"
                      onClick={() => {
                        history.push("/cart");
                      }}
                    >
                      <TiShoppingCart />
                      <div className="number">{countCart}</div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
