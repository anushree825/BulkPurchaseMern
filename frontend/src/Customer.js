import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/login.component'
import Customer from './components/customer.component'
import Logout from './components/logout.component'

function Customer() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Customer</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">UsersList</Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={Customer}/>
        <Route path="/logout" component={Logout}/>
      </div>
    </Router>
  );
}

export default Customer;
