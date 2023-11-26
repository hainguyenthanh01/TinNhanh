import React, { useState } from "react";
import PropTypes from "prop-types";
import Global from "../Image/Global";

Footer.propTypes = {};

function Footer(props) {
  const [email, setEmail] = useState('')
  const handleNotiEmail = (e) => {
    e.preventDefault()
    const data = { email }
    fetch("http://localhost:8000/api/email-receive-notification",
      {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })

  }
  return (
    <div className="footer">
      {/* <div className="footer-static-top">
                <div className="container">
                    <div className="footer-shipping pt-60 pb-55 pb-xs-25">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer1} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Free Delivery</h2>
                                        <p>And free returns. See checkout for delivery dates.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-sm-55 pb-xs-55">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer2} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Safe Payment</h2>
                                        <p>Pay with the world's most popular and secure payment methods.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer3} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>Shop with Confidence</h2>
                                        <p>Our Buyer Protection covers your purchasefrom click to delivery.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 pb-xs-30">
                                <div className="li-shipping-inner-box">
                                    <div className="shipping-icon">
                                        <img src={Global.Footer4} alt="Shipping Icon" />
                                    </div>
                                    <div className="shipping-text">
                                        <h2>24/7 Help Center</h2>
                                        <p>Have a question? Call a Specialist or chat online.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
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
                    We are a team of designers and developers that create high
                    quality HTML Template & Woocommerce, Shopify Theme.
                  </p>
                </div>
                <ul className="des">
                  <li>
                    <span>Address: </span>
                    122 Triều Khúc - Thanh Xuân - Hà Nội
                  </li>
                  <li>
                    <span>Phone: </span>
                    <a href="#">0392136898</a>
                  </li>
                  <li>
                    <span>Email: </span>
                    <a href="mailto://haicot2001@gmail.com">
                      haicot2001@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer-block">
                  <h3 className="footer-block-title">Our company</h3>
                  <ul>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="footer-newsletter">
                  <h4>Sign up to newsletter</h4>
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
                          placeholder="Enter your email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                        <button onClick={handleNotiEmail} className="btn" >
                          Subscribe
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
    </div>
  );
}

export default Footer;
