import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, Button, UncontrolledCollapse
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
            review: ''
        }
        this.order = this.order.bind(this);
        this.onchangeQuantity = this.onchangeQuantity.bind(this);
        this.onchangeName = this.onchangeName.bind(this);
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
            <div>{
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