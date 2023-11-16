import React, { useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import AuthContextProvider from './component/context/Auth'

import Header from './component/Shared/Header'
import Menu from './component/Shared/Menu';

import Product from './component/Product/Product'
import CreateProduct from './component/Product/CreateProduct'
import UpdateProduct from './component/Product/UpdateProduct'

import Category from './component/Category/Category'
import CreateCategory from './component/Category/CreateCategory'
import DetailCategory from './component/Category/DetailCategory'
import UpdateCategory from './component/Category/UpdateCategory'

import Permission from './component/Permission/Permission'
import CreatePermission from './component/Permission/CreatePermission'
import UpdatePermission from './component/Permission/UpdatePermission'

import User from './component/User/User'
import CreateUser from './component/User/CreateUser'
import UpdateUser from './component/User/UpdateUser'

import UserCus from './component/UserCus/UserCus'
import CreateUserCus from './component/UserCus/CreateUserCus'
import UpdateUserCus from './component/UserCus/UpdateUserCus'

import Order from './component/Order/Order'
import DetailOrder from './component/Order/DetailOrder'
import ConfirmOrder from './component/Order/ConfirmOrder'
import Delivery from './component/Order/Delivery'
import ConfirmDelivery from './component/Order/ConfirmDelivery'
import CompletedOrder from './component/Order/CompletedOrder'
import CancelOrder from './component/Order/CancelOrder'
import Login from './component/Login/Login';
import NotFound from './component/NotFound/NotFound';
import Coupon from './component/Conpon/Coupon';

import CreateCoupon from './component/Conpon/CreateCoupon';
import UpdateCoupon from './component/Conpon/UpdateCoupon';
import Sale from './component/Sale/Sale';
import CreateSale from './component/Sale/CreateSale';
import UpdateSale from './component/Sale/UpdateSale';
import LeftMenu from './component/LeftMenu/LeftMenu';

function App() {
  return (
    <AuthContextProvider>
      <Router>

        <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

          <Header />
          <LeftMenu />
          {/* <Menu /> */}

        
      </div>

      </Router>
    </AuthContextProvider>




  );
}

export default App;
