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
            products: [],
            rating: '',
            review: ''
        }
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.review = this.review.bind(this);
    }
    onChangeRating(event) {
        this.setState({ rating: event });
    }
    onChangeReview(event) {
        this.setState({ review: event.target.value });
    }
    review(event) {
        if (this.state.rating === '' || this.state.review === '') {
            alert("Please Review properly!");
        }
        else {
            const newReview = {
                order: event.target.value,
                rating: this.state.rating,
                review: this.state.review,
                status: "reviewed"
            }
            axios.post('http://localhost:4000/user/review', newReview)
                .then(function (res) {
                    console.log(res.data);
                });
            axios.post('http://localhost:4000/order/review', newReview)
                .then(function (res) {
                    console.log(res.data);
                });

            window.location.reload(false);
            this.setState({
                rating: '',
                review: ''
            });
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/orders/view')
            .then(response => {
                this.setState({ products: response.data });
                console.log(this.state.products)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>{
                this.state.products.map((currentUser, i) => {
                    if (currentUser['customer'] === localStorage.getItem('user')) {
                        if (currentUser['status'] === 'dispatched') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentUser.order} x{currentUser.quantity}</CardHeader>
                                    <CardHeader>Status: {currentUser.status}
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
                                    <Button color="info" value={currentUser.order} onClick={this.review}>Rate and Review</Button>
                                </Card>
                            )
                        }
                        else {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentUser.order} x{currentUser.quantity}</CardHeader>
                                    <CardHeader>Status: {currentUser.status}</CardHeader>
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
