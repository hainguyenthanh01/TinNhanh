import React, { useState, useEffect, useContext } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { AuthContext } from './component/context/Auth'

import Header from './component/Shared/Header'

import Login from './component/Login/Login';
import NotFound from './component/NotFound/NotFound';

import LeftMenu from './component/LeftMenu/LeftMenu';


function App() {
  const { user } = useContext(AuthContext);
  return (

    <Router>

      <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">

        <Header />
        {user ? <LeftMenu /> : (
          <Switch>
            <Route exact path='/' component={Login} />
            <Route component={NotFound} />
          </Switch>
        )}
        {/* <Menu /> */}


      </div>

    </Router>





  );
}

export default App;
