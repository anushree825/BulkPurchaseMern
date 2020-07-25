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
        this.reviewedOrderAccumulate(user)
    }

    async reviewedOrderAccumulate(user) {
        try {
            const res = await axios.post('http://localhost:4000/reviewedOrderAccumulate',user)
            console.log(res.data)
            if (res.data == 'Error')
            console.log('couldnt extract info')
            else{
                const res1 = await axios.post('http://localhost:4000/reviewedOrderRetrieval',user)
                if (res1.data==='Error')
                console.log(res1.data)
                else{
                    this.setState({orders: res1.data});
                        console.log(this.state)
                }
            }
        }
        catch (err) {
            console.log('FrontEndProb')
            console.log(err)
        }
    }

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
