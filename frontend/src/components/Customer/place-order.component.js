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
        if (this.state.quantity === '' ) {
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
            this.setState({
                quantity: '',
            });

            axios.post('http://localhost:4000/order/update', newOrder)
                .then(function (res) {
                    if (res.data['User'] === 'invalid') {
                        alert('Invalid Number Entered');
                    }
                    else {
                        axios.post('http://localhost:4000/order/add', newOrder)
                            .then()
                        window.location.reload(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
            .then(response => {
                this.setState({ products: response.data });
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                {
                    this.state.products.map((currentUser, i) => {
                        if (currentUser.status !== 'deleted' && currentUser.quantity !== 0) {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
                                    <CardHeader>Price per unit: {currentUser.price}
                                        <br />Status: {currentUser.status}
                                        <br />Vendor: {currentUser.owner}
                                    </CardHeader>
                                    <Button color="primary" id={currentUser.name} onClick={this.onchangeName} value={currentUser.name}>Place Order</Button>
                                    {/* <UncontrolledCollapse toggler={currentUser.name}> */}
                                        <input type="number"
                                            className="form-control text-center"
                                            placeholder="Enter Quantity Required"
                                            min = "1"
                                            onChange={this.onchangeQuantity}
                                            value={this.state.quantity}
                                        />
                                    {/* </UncontrolledCollapse> */}
                                    <Button color="success" className="form-control" value={currentUser.name} onClick={this.order}>Submit Order</Button>

                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}