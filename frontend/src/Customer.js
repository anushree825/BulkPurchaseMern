import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App'
import PlaceOrder from './components/Customer/place-order.component'
import ProductList from './components/Customer/show-products.component'
import DispatchedList from './components/Customer/status.component'
import UserList from './components/Customer/view-vendor.component'

function onlogout() {
  localStorage.setItem('user', '');
  localStorage.setItem('role', '');
  window.location.replace('/');
}
function Customer() {
  // if (localStorage.getItem('role') === 'Customer') {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/Customer" className="navbar-brand">Customer</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/Customer/Place-order" className="nav-link">Place Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/Customer/View-status" className="nav-link">View Status</Link>
              </li>
              <li className="navbar-item">
                <Link to="/Customer/View-vendor" className="nav-link">View Vendors</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link" onClick={onlogout}>Log Out</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <Route path="/Customer/Place-order" exact component={PlaceOrder} />
        <Route path="/Customer" exact component={ProductList} />
        <Route path="/Customer/View-status" exact component={DispatchedList} />
        <Route path="/Customer/View-vendor" exact component={UserList} />
      </div>
    </Router>
  )
}
//   else {
//     // console.log("ji");
//     // ReactDOM.render(<Router> < App /> </Router>, document.getElementById('root'));
//     return null
//   }
// }

export default Customer;
