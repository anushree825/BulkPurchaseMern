import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Login from './components/login.component'

import Vendor from './Vendor'
import Customer from './Customer'


function App() {
  console.log(localStorage.getItem('role'))
  if (localStorage.getItem('role')) {
    if (localStorage.getItem('role') === 'vendor') {
      ReactDOM.render(<Router> < Vendor /> </Router>, document.getElementById('root'));
      // return <Redirect to="/Vendor" />
      return null
    }
    if (localStorage.getItem('role') === 'customer') {
      ReactDOM.render(<Router> < Customer /> </Router>, document.getElementById('root'));
      // return <Redirect to="/Customer" />
      return null
    }
  }
  else {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Home </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Register</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
          </nav>

          <br />
          <Route path="/" exact component={UsersList} />
          <Route path="/create" component={CreateUser} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}


export default App;