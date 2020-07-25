import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            ordered: 0,
            status: 'waiting',
            owner: '',
            ratings: 0,
            review: [],
            rating_sum: 0
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.name === '' || this.state.price === '' || this.state.quantity === '') {
            alert("Please enter all required details");
        }

        else {
            const newProduct = {
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity,
                status: 'waiting',
                ordered: 0,
                owner: localStorage.getItem('user'),
                ratings: 0,
                review: [],
                rating_sum: 0
            }

            this.data(newProduct)

            // axios.post('http://localhost:4000/product/add', newProduct)
            //     .then(res => console.log(res.data));

            this.setState({
                name: '',
                price: '',
                ordered: 0,
                status: 'waiting',
                quantity: '',
                owner: '',
                ratings: 0,
                review: [],
                rating_sum: 0
            });
        }
    }

    async data(newProduct) {
        try {
            const res = await axios.post('http://localhost:4000/product/add', newProduct);
            // console.log(res.data)
            if (res.data === 'Error') {
                alert("Error")
            }
            else {
                console.log('New Product Added')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="col-lg">
                <form onSubmit={this.onSubmit} className="form-horizontal">
                    <div className="form-group .form-horizontal" >
                        <label className="control-label col-sm-10 .control-label" htmlFor="name"> Name Of the product: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                className="form-control"
                                placeholder="Enter Name Of The Product"
                                value={this.state.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                    </div >
                    <div className="form-group .form-horizontal" >
                        <label class="control-label col-sm-10 .control-label" htmlFor="price"> Price of the Bundle: </label>
                        <div class="col-sm-10">
                            <input type="number"
                                className="form-control"
                                placeholder="Enter price"
                                min="0"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                            />
                        </div>
                    </div >
                    <div className="form-group" >
                        <label class="control-label col-sm-10 .control-label" htmlFor="quantity"> Quantity of the Bundle: </label>
                        <div class="col-sm-10">
                            <input type="number"
                                className="form-control"
                                placeholder="Enter quantity"
                                min="0"
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                            />
                        </div>
                    </div>
                    <div className="form-group" >
                        <input type="submit" value="Create Product" className="btn btn-primary btn-lg" />
                    </div>
                </form>
            </div>
        )
    }
}