import React, { useState, useContext, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { AuthContext } from "../context/Auth";

function Menu() {
  const { user, jwt } = useContext(AuthContext);

  const [menu, setMenu] = useState([
    {
      item: "Customer",
    },
    {
      item: "Coupon",
    },
    {
      item: "Product",
    },
    {
      item: "Sale",
    },
    {
      item: "Category",
    },
    {
      item: "Order",
    },
    {
      item: "ConfirmOrder",
    },
    {
      item: "Delivery",
    },
    {
      item: "ConfirmDelivery",
    },
    {
      item: "CompletedOrder",
    },
    {
      item: "CancelOrder",
    },
    {
      item: "User",
    },
    {
      item: "Permission",
    },
    // "Category", ,
    // "Permission",
    // "User",
    // "Order",
    // "ConfirmOrder",
    // "Delivery",
    // "ConfirmDelivery",
    // "CompletedOrder",
    // "CancelOrder"
  ]);
  let { pathname } = window.location;
  return (
    <div>
      {jwt && user ? (
        <aside className="left-sidebar" data-sidebarbg="skin6">
          <div className="scroll-sidebar" data-sidebarbg="skin6">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className="list-divider"></li>

                <li className="nav-small-cap">
                  {/* <span className="hide-menu">Components</span> */}
                </li>

                <li className="sidebar-item">
                  {" "}
                  <a
                    className="sidebar-link has-arrow"
                    href="#"
                    aria-expanded="false"
                  >
                    <i data-feather="grid" className="feather-icon"></i>
                    <span className="hide-menu">Tables </span>
                  </a>
                  <ul
                    aria-expanded="false"
                    className="collapse  first-level base-level-line"
                  >
                    {menu &&
                      menu.map((item, index) => (
                        <li className="sidebar-item active" key={index}>
                          <NavLink
                            to={"/" + item.item.toLowerCase()}
                            className="sidebar-link"
                          >
                            {item.item}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Menu;
