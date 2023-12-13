import React, { useState } from "react";
import PropTypes from "prop-types";
import Global from "../Image/Global";
import MessageNotify from "../Message/Message";

Footer.propTypes = {};

function Footer(props) {
  const [email, setEmail] = useState("");
  const [messageObj, setMessageObj] = useState({
    type: "",
    content: "",
  });
  function Email(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }
  const handleNotiEmail = (e) => {
    e.preventDefault();
    const data = { email };
    fetch("http://localhost:8000/api/email-receive-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    if (!Email(email)) {
      setMessageObj({
        type: "error",
        content: "Vui lòng nhập đúng định dạng email!",
        active: new Date() * 1,
      });
      return;
    }
    if (!email) {
      setMessageObj({
        type: "error",
        content: "Vui lòng nhập đầy đủ email!",
        active: new Date() * 1,
      });
      return;
    }
    setMessageObj({
      type: "success",
      content: "Thành công",
      active: new Date() * 1,
    });
  };
  return (
    <div className="footer">
      <div className="footer-static-middle">
        <div className="container">
          <div className="footer-logo-wrap pt-50 pb-35">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="footer-logo">
                  <img
                    src={Global.Logo}
                    // style={{ width: "19rem" }}
                    alt="Footer Logo"
                  />
                  <p className="info">
                    BULI - wear is swag - Với phương châm <br /> "Đơn giản là sự
                    tinh tế tối thượng"
                  </p>
                </div>
                <ul className="des">
                  <li>
                    <span>Địa chỉ: </span>
                    122 Triều Khúc - Thanh Xuân - Hà Nội
                  </li>
                  <li>
                    <span>Phone: </span>
                    0392136898
                  </li>
                  <li>
                    <span>Email: </span>
                    hainguyenthanh16101@gmail.com
                  </li>
                </ul>
              </div>
              <div
                className="col-lg-2 col-md-3 col-sm-6"
                style={{ marginLeft: "8%" }}
              >
                <div className="footer-block">
                  <h3 className="footer-block-title">Công ty chúng tôi</h3>
                  <ul>
                    <li>
                      <a href="/about">Về chúng tôi</a>
                    </li>
                    <li>
                      <a href="/contact">Liên hệ</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4" style={{ marginLeft: "8%" }}>
                <div className="footer-newsletter">
                  <h4>Đăng ký nhận thông tin mới</h4>
                  <form
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="footer-subscribe-form validate"
                    target="_blank"
                  >
                    <div id="mc_embed_signup_scroll">
                      <div
                        id="mc-form"
                        className="mc-form subscribe-form form-group"
                      >
                        <input
                          id="mc-email"
                          type="email"
                          autoComplete="off"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleNotiEmail} className="btn">
                          Đăng ký
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageNotify
        type={messageObj.type}
        content={messageObj.content}
        active={messageObj.active}
      />
    </div>
  );
}

export default Footer;
