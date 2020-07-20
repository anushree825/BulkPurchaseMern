import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            ordered:0,
            status:'waiting',
            owner:''
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
        if(this.state.name==='' || this.state.price==='' || this.state.quantity===''){
            alert("please enter all requeired details");
        }
        else{
            const newProduct = {
                name: this.state.name,
                price: this.state.price / this.state.quantity,
                quantity: this.state.quantity,
                status: 'waiting',
                ordered:0,
                owner:localStorage.getItem('user')
            }
            axios.post('http://localhost:4000/product/add', newProduct)
                .then(res => console.log(res.data));
            this.setState({
                name: '',
                price: '',
                ordered:0,
                status:'waiting',
                quantity: '',
                owner:''
            });
        }
    }

    render() {
        return (  
            <div class="col-lg">
            <form onSubmit = { this.onSubmit } class="form-horizontal">
            <div className = "form-group .form-horizontal" >
            <label class="control-label col-sm-10 .control-label"  for="name"> Name Of the product: </label> 
            <div class="col-sm-10">
                <input type = "text"
                className = "form-control"
                placeholder="Enter Name Of The Product"
                value = { this.state.name }
                onChange = { this.onChangeName }
                /> 
            </div>
            </div >
            <div className = "form-group .form-horizontal" >
            <label class="control-label col-sm-10 .control-label"  for="price"> Price of the Bundle: </label> 
            <div class="col-sm-10">
                <input type = "number"
                className = "form-control"
                placeholder="Enter price"
                value = { this.state.price }
                onChange = { this.onChangePrice }
                />
            </div>
            </div >
            <div className = "form-group" >
            <label class="control-label col-sm-10 .control-label"  for="quantity"> Quantity of the Bundle: </label> 
            <div class="col-sm-10">
                <input type = "number"
                className = "form-control"
                placeholder="Enter quantity"
                value = { this.state.quantity }
                onChange = { this.onChangeQuantity }
                />
            </div>
            </div>
            <div className = "form-group" >
            <input type = "submit" value = "Create Product" className = "btn btn-primary btn-lg" / >
            </div>
            </form>
            </div>
        )
    }
}