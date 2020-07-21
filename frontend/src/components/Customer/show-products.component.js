import React, {Component} from 'react';
import axios from 'axios';
import {
    Card,  CardHeader, Button , DropdownItem , ButtonDropdown
  } from 'reactstrap';

export default class ProductList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search:''
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.search = this.search.bind(this);
        this.rating = this.rating.bind(this);
        this.price = this.price.bind(this);
        this.quantity = this.quantity.bind(this);
    }
    onChangeSearch(event){
        this.setState({search:event.target.value})
    }
    search(event){
        const sear = {
            name: this.state.search
        }
        axios.post('http://localhost:4000/product/search',sear)
            .then(response => {
                this.setState({products:response.data})
            })
            .catch(function(err){
                console.log(err)
            })
    }
    price(event){
        const sear = {
            name: this.state.search
        }
        axios.post('http://localhost:4000/product/price',sear)
            .then(response => {
                this.setState({products:response.data})
            })
            .catch(function(err){
                console.log(err)
            })
    }
    quantity(event){
        const sear = {
            name: this.state.search
        }
        axios.post('http://localhost:4000/product/quantity',sear)
            .then(response => {
                this.setState({products:response.data})
            })
            .catch(function(err){
                console.log(err)
            })
    }
    rating(event){
        const sear = {
            name: this.state.search
        }
        axios.post('http://localhost:4000/product/rating',sear)
            .then(response => {
                this.setState({products:response.data})
            })
            .catch(function(err){
                console.log(err)
            })
    }
    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
             .then(response => {
                 this.setState({products: response.data});
                 console.log()
             })
             .catch(function(error) {
                 console.log(error);
             })
    }


    render() {
        return (
            <div>
                <div class="col-lg">
                    <input type = "text"
                    className = "form-control"
                    placeholder="Search"
                    value = { this.state.search }
                    onChange = { this.onChangeSearch }
                    />
                </div>
                <Button color="success" className="form-control" value="Search" onClick={this.search}>Submit</Button>
                <ButtonDropdown>
                        <DropdownItem onClick={this.price}>Price</DropdownItem>
                        <DropdownItem onClick={this.quantity}>Quantity</DropdownItem>
                        <DropdownItem onClick={this.rating}>Rating</DropdownItem>
                </ButtonDropdown>
                { 
                this.state.products.map((currentUser, i) => {
                    if(currentUser.status!=='deleted'){
                         return (
                        <Card className="p-3 text-center">
                                <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
                                <CardHeader>Price per unit: {currentUser.price}
                                <br/>Status: {currentUser.status}
                                <br />Vendor: {currentUser.owner}
                                <br />Orders: {currentUser.ordered}
                                </CardHeader>
                            </Card>
                        )
                    }
                    // else{
                    //     return (
                    //         <Card className="p-3 text-center">
                    //                 <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
                    //                 <CardHeader>Price per unit: {currentUser.price}
                    //                 <br/>Status: Cancelled
                    //                 <br />Vendor: {currentUser.owner}
                    //                 <br />Orders: {currentUser.ordered}
                    //                 </CardHeader>
                    //             </Card>
                    //         )
                    // }
                })
                }
            </div>
        )
    }
}