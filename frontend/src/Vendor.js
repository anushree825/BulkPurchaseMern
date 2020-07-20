import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import CreateProduct from './components/Vendor/create-product.component'
import ProductList from './components/Vendor/show-products.component'
import OrderList from './components/Vendor/show-orders.component'
import ShowAll from './components/Vendor/show-all.component'
import DispatchedList from './components/Vendor/view-dispatched.component'

function onlogout() {
  localStorage.setItem('user', '');
  localStorage.setItem('role', '');
  window.location.replace('/');
}
function Vendor() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/Vendor" className="navbar-brand">Vendor</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/Vendor/create-product" className="nav-link">Create Product</Link>
              </li>
              <li className="navbar-item">
                <Link to="/Vendor/View-product" className="nav-link">View Product</Link>
              </li>
              <li className="navbar-item">
                <Link to="/Vendor/View-Order" className="nav-link">View Order</Link>
              </li>
              <li className="navbar-item">
                <Link to="/Vendor/View-Dispatched" className="nav-link">View Dispatched</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item" color="danger">
                <Link to="/" className="nav-link" onClick={onlogout}>Log Out</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <Route path="/Vendor/Create-product" exact component={CreateProduct} />
        <Route path="/Vendor/View-product" component={ProductList} />
        <Route path="/Vendor/View-order" component={OrderList} />
        <Route path="/Vendor" exact component={ShowAll} />
        <Route path="/Vendor/View-Dispatched" exact component={DispatchedList} />
      </div>
    </Router>
  );
}

export default Vendor;
