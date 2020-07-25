import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader
} from 'reactstrap';
// import orders from '../../../../backend/models/orders';

export default class DispatchedList extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }

    }
   
    componentDidMount() {
        const user = {
            name: localStorage.getItem('user')
        }
        axios.post('http://localhost:4000/orders/view/cus1',user)
             .then(response => {
                 axios.post('http://localhost:4000/orders/view/cus2',user)
                    .then(response => {
                        this.setState({orders: response.data});
                        console.log(this.state)
                    })
                    .catch(function(error) {
                        console.log(error);
             })
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    // componentDidMount() {
    //     const user = {
    //         id: localStorage.getItem('user')
    //     }
    //     // console.log(localStorage.getItem('user'))
    //     // this.reviewedOrders(user)
    //     // axios.post('http://localhost:4000/reviewedOrders',user)
    //     //     .then(response => {
    //     //         console.log(response.data)
    //     //         this.setState({ orders: response.data })
    //     //     })
    //     //     .catch(function (error) {
    //     //         console.log(error)
    //     //     })
    // }

    // async reviewedOrders(user) {
    //     try {
    //         const res = await axios.post('http://localhost:4000/reviewedOrders', user)
    //         console.log(res.data)
    //         if (res.data == 'Error')
    //         console.log('couldnt extract info')
    //         else{
    //             this.res.data.map((currentProd, i) => {
    //                 const res1 = axios.post('http://localhost:4000/reviewedOrders1', currentProd)
    //                 console.log(res1.data)
    //             });
    //         }
    //     }
    //     catch (err) {
    //         console.log('FrontEndProb')
    //         console.log(err)
    //     }
    // }

    render() {
        return (
            <div>
                {
                    this.state.orders.map((currentOrder, i) => {
                        // if (currentOrder['status'] === 'reviewed') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentOrder.order} x{currentOrder.quantity}</CardHeader>
                                    <CardHeader>Rating: {currentOrder.rating}
                                        <br />Review: {currentOrder.review}
                                        <br />Customer: {currentOrder.customer}
                                    </CardHeader>
                                </Card>
                            )
                        // }
                    })
                }
            </div>
        )
    }
}
