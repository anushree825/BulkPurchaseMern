import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, Button
} from 'reactstrap';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';

export default class DispatchedList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            rating: 0,
            review: ''
        }
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.review = this.review.bind(this);
        // this.onChangeUserRating = this.onChangeUserRating.bind(this);
        // this.onChangeUserReview = this.onChangeUserReview.bind(this);
        this.userReview = this.userReview.bind(this);
    }
    onChangeRating(event) {
        this.setState({ rating: event });
    }
    onChangeReview(event) {
        this.setState({ review: event.target.value });
    }
    // onChangeUserRating(event) {
    //     this.setState({ rating: event });
    // }
    // onChangeUserReview(event) {
    //     this.setState({ review: event.target.value });
    // }
    review(event) {
        if (this.state.rating === '' || this.state.review === '') {
            alert("Please Review properly!");
        }
        else {
            const newReview = {
                id: event.target.value,
                rating: this.state.rating,
                review: this.state.review,
                status: "reviewed"
            }
            axios.post('http://localhost:4000/order/review/', newReview)
                .then(function (res) {
                    console.log(res.data)
                })
            axios.post('http://localhost:4000/product/review', newReview)
                .then(function (res) {
                    console.log(res.data)
                    window.location.reload(false)
                })

            window.location.reload(false)
            this.setState({
                rating: 0,
                review: ''
            });
        }
    }
    userReview(event) {
        if (this.state.rating === '' || this.state.review === '') {
            alert("Please Review properly!");
        }
        else {
            const newReview = {
                id: event.target.value,
                rating: this.state.rating,
                review: this.state.review,
                status: "reviewed"
            }

            axios.post('http://localhost:4000/user/review', newReview)
                .then(function (res) {
                    console.log(res.data)
                    window.location.reload(false)
                })

            window.location.reload(false)
            this.setState({
                rating: 0,
                review: ''
            });
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/orders/view')
            .then(response => {
                this.setState({ orders: response.data })
                console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>{
                this.state.orders.map((currentOrder, i) => {
                    if (currentOrder['customer'] === localStorage.getItem('user')) {
                        if (currentOrder['status'] === 'dispatched') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentOrder.order} x{currentOrder.quantity}</CardHeader>
                                    <CardHeader>Status: {currentOrder.status}
                                        <br />Rating:
                                        <RadioGroup onChange={this.onChangeRating} horizontal>
                                            <ReversedRadioButton value="1" class="col-sm-10" >1</ReversedRadioButton>
                                            <ReversedRadioButton value="2" class="col-sm-10">2</ReversedRadioButton>
                                            <ReversedRadioButton value="3" class="col-sm-10">3</ReversedRadioButton>
                                            <ReversedRadioButton value="4" class="col-sm-10">4</ReversedRadioButton>
                                            <ReversedRadioButton value="5" class="col-sm-10">5</ReversedRadioButton>
                                        </RadioGroup>
                                    Review:
                                        <input type="text"
                                            className="form-control text-center"
                                            placeholder="Enter Review"
                                            onChange={this.onChangeReview}
                                            value={this.state.review}
                                        />
                                    </CardHeader>
                                    <Button color="info" value={currentOrder._id} onClick={this.review}>Rate and Review</Button>
                                </Card>
                            )
                        }
                        else if (currentOrder['status'] === 'placed') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentOrder.order} </CardHeader>
                                    <CardHeader>Status: {currentOrder.status}
                                        <br />Rating:
                                        <RadioGroup onChange={this.onChangeRating} horizontal>
                                            <ReversedRadioButton value="1" class="col-sm-10" >1</ReversedRadioButton>
                                            <ReversedRadioButton value="2" class="col-sm-10">2</ReversedRadioButton>
                                            <ReversedRadioButton value="3" class="col-sm-10">3</ReversedRadioButton>
                                            <ReversedRadioButton value="4" class="col-sm-10">4</ReversedRadioButton>
                                            <ReversedRadioButton value="5" class="col-sm-10">5</ReversedRadioButton>
                                        </RadioGroup>
                                    Review:
                                        <input type="text"
                                            className="form-control text-center"
                                            placeholder="Enter Review"
                                            onChange={this.onChangeReview}
                                            value={this.state.review}
                                        />
                                    </CardHeader>
                                    <Button color="danger" value={currentOrder._id} onClick={this.userReview}>Rate Vendor</Button>
                                </Card>
                            )
                        }
                        else {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentOrder.order} x{currentOrder.quantity}</CardHeader>
                                    <CardHeader>Status: {currentOrder.status}</CardHeader>
                                </Card>
                            )
                        }
                    }
                })
            }
            </div>
        )
    }
}
