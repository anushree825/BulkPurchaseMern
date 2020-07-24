import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, Button, DropdownItem, ButtonDropdown, UncontrolledCollapse
} from 'reactstrap';
export default class PlaceOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            quantity: '',
            order: '',
            customer: '',
            status: '',
            rating: 0,
            review: '',
            search: ''
        }
        this.order = this.order.bind(this);
        this.onchangeQuantity = this.onchangeQuantity.bind(this);
        this.onchangeName = this.onchangeName.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.search = this.search.bind(this);
        this.rating = this.rating.bind(this);
        this.price = this.price.bind(this);
        this.quantity = this.quantity.bind(this);
    }

    onchangeQuantity(event) {
        this.setState({ quantity: event.target.value })
    }
    onchangeName(event) {
        this.setState({ order: event.target.value })
    }

    order(event) {
        if (this.state.quantity === '') {
            alert('Enter the required Quantity');
        }
        else {
            const newOrder = {
                quantity: this.state.quantity,
                order: this.state.order,
                customer: localStorage.getItem('user'),
                status: "waiting",
                rating: 0,
                review: ''
            }
            this.updateOrder(newOrder)
            this.setState({
                quantity: '',
            });
        }
    }

    async updateOrder(newOrder) {
        try {
            const res = await axios.post('http://localhost:4000/order/update', newOrder)
            window.location.reload(false);
            if (res.data['User'] === 'invalid') {
                alert('Invalid Number Entered');
            }
            else {
                await axios.post('http://localhost:4000/order/add', newOrder)
                console.log("Order Successfully Placed")
                window.location.reload(false);
            }

        }
        catch (err) {
            console.log(err)
        }

    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value })
    }
    search(event) {
        const search = {
            name: this.state.search
        }
        this.searchProduct(search)
    }

    async searchProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/search', search)
            this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
    price(event) {
        const search = {
            name: this.state.search
        }
        this.priceProduct(search)
    }

    async priceProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/price', search)
            if (res == 'Error')
                this.setState({ products: res.data })
            else
                console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    quantity(event) {
        const search = {
            name: this.state.search
        }
        this.quantityProduct(search)
    }

    async quantityProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/quantity', search)
            this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    rating(event) {
        const search = {
            name: this.state.search
        }
        this.ratingProduct(search)
    }

    async ratingProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/rating', search)
            this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }


    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
            .then(response => {
                this.setState({ products: response.data });
                console.log()
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div class="col-lg">
                    <input type="text"
                        className="form-control"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.onChangeSearch}
                    />
                </div>
                <Button color="success" className="form-control" value="Search" onClick={this.search}>Submit</Button>
                <ButtonDropdown>
                    <DropdownItem onClick={this.price}>Price</DropdownItem>
                    <DropdownItem onClick={this.quantity}>Quantity</DropdownItem>
                    <DropdownItem onClick={this.rating}>Rating</DropdownItem>
                </ButtonDropdown>
                {
                    this.state.products.map((currentProduct, i) => {
                        if (currentProduct.status !== 'deleted' && currentProduct.quantity !== 0) {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentProduct.name} x{currentProduct.quantity}</CardHeader>
                                    <CardHeader>Price per unit: {currentProduct.price}
                                        <br />Status: {currentProduct.status}
                                        <br />Vendor: {currentProduct.owner}
                                    </CardHeader>
                                    <Button color="primary" id={currentProduct.name} onClick={this.onchangeName} value={currentProduct.name}>Place Order</Button>
                                    <UncontrolledCollapse toggler={currentProduct.name}>
                                        <input type="number"
                                            className="form-control text-center"
                                            placeholder="Enter Required Quantity"
                                            min="1"
                                            onChange={this.onchangeQuantity}
                                            value={this.state.quantity}
                                        />
                                        <Button color="success" className="form-control" value={currentProduct.name} onClick={this.order}>Confirm Order</Button>
                                    </UncontrolledCollapse>
                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}