import React from "react";
import PropTypes from "prop-types";

Contact.propTypes = {};

function Contact(props) {
  return (
    <div>
      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li>
                <a href="/">Trang chủ</a>
              </li>
              <li className="active">Liên hệ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 offset-lg-1 col-md-12 order-1 order-lg-2">
              <div className="contact-page-side-content">
                <h3 className="contact-page-title">Liện hệ chúng tôi</h3>
                <p className="contact-page-message mb-25">
                  BULI - wear is swag <br />
                  Với phương châm "Đơn giản là sự tinh tế tối thượng"
                </p>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-fax"></i> Địa chỉ
                  </h4>
                  <p>122 Triều Khúc - Thanh Xuân - Hà Nội</p>
                </div>
                <div className="single-contact-block">
                  <h4>
                    <i className="fa fa-phone"></i> Điện thoại
                  </h4>
                  <p>Di động: 0392 136 898</p>
                </div>
                <div className="single-contact-block last-child">
                  <h4>
                    <i className="fa fa-envelope-o"></i> Email
                  </h4>
                  <p>hainguyenthanh16101@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 order-2 order-lg-1">
              <div className="contact-form-content pt-sm-55 pt-xs-55">
                <h3 className="contact-page-title">Ý kiến của bạn</h3>
                <div className="contact-form">
                  <form
                    id="contact-form"
                    action="http://demo.hasthemes.com/limupa-v3/limupa/mail.php"
                    method="post"
                  >
                    <div className="form-group">
                      <label>
                        Tên của bạn <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        id="customername"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Email của bạn <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        id="customerEmail"
                        required
                      />
                    </div>
                    <div className="form-group mb-30">
                      <label>Ý kiến của bạn</label>
                      <textarea
                        name="contactMessage"
                        id="contactMessage"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Gửi"
                        className="li-btn-3"
                        name="submit"
                      />
                    </div>
                  </form>
                </div>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
