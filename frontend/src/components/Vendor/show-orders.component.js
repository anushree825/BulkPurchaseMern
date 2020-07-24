import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, Button
} from 'reactstrap';

export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            products: [] 
        }
        this.dispatch = this.dispatch.bind(this);

    }
    dispatch(event) {
        // event.preventDefault();
        const del = {
            name: event.target.value
        }

        this.dispatchProduct(del)
        this.dispatchOrder(del)

        window.location.reload('false'); 
    }

    async dispatchProduct(del) {
        try {
            const res = await axios.post('http://localhost:4000/product/dispatch', del);
            // window.location.reload('false');
            console.log(res.data)
            if (res.data === 'Error') {
                alert("Error")
            }
            else {
                console.log('Product Dispatched')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async dispatchOrder(del) {
        try {
            const res = await axios.post('http://localhost:4000/orders/dispatch', del)
            // window.location.reload('false');
            console.log(res)
            // if (res.data === '0') {
            //     alert("Error")
            // }
            // else {
            console.log('Order Dispatched')
            // }
        }
        catch (err) {
            console.log('Order Dispatched')
            // console.log(err)
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
            .then(response => {
                this.setState({ products: response.data });
                console.log('data received');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.products.map((currentProduct, i) => {
                        if (currentProduct['owner'] === localStorage.getItem('user') && currentProduct['status'] === 'ready') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentProduct.name} x{currentProduct.ordered}</CardHeader>
                                    <CardHeader>Price per unit: {currentProduct.price}
                                        <br />Status: Ready To Dispatch
                                    </CardHeader>
                                    <Button color="info" value={currentProduct.name} onClick={this.dispatch}>Dispatch</Button>
                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}