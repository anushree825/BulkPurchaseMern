import React, { Component } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, Button, DropdownItem, ButtonDropdown
} from 'reactstrap';

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            search: ''
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.search = this.search.bind(this);
        this.rating = this.rating.bind(this);
        this.price = this.price.bind(this);
        this.quantity = this.quantity.bind(this);
    }
    onChangeSearch(event) {
        this.setState({ search: event.target.value })
    }
    search(event) {
        const search = {
            name: this.state.search
        }
        this.searchProduct(search)
    }

    async searchProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/search', search)
            this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }
    price(event) {
        const search = {
            name: this.state.search
        }
        this.priceProduct(search)
    }

    async priceProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/price', search)
            if (res == 'Error')
                console.log(res)
            else
                this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    quantity(event) {
        const search = {
            name: this.state.search
        }
        this.quantityProduct(search)
    }

    async quantityProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/quantity', search)
            this.setState({ products: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    rating(event) {
        const search = {
            name: this.state.search
        }
        this.ratingProduct(search)
    }

    async ratingProduct(search) {
        try {
            const res = await axios.post('http://localhost:4000/product/rating', search)
            this.setState({ products: res.data })
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
            <div>
                <div class="col-lg">
                    <input type="text"
                        className="form-control"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.onChangeSearch}
                    />
                </div>
                <Button color="success" className="form-control" value="Search" onClick={this.search}>Submit</Button>
                <ButtonDropdown>
                    <DropdownItem onClick={this.price}>Price</DropdownItem>
                    <DropdownItem onClick={this.quantity}>Quantity</DropdownItem>
                    <DropdownItem onClick={this.rating}>Rating</DropdownItem>
                </ButtonDropdown>
                {
                    this.state.products.map((currentProduct, i) => {
                        if (currentProduct.status !== 'deleted') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentProduct.name} x{currentProduct.quantity}</CardHeader>
                                    <CardHeader>Price per unit: {currentProduct.price}
                                        <br />Status: {currentProduct.status}
                                        <br />Vendor: {currentProduct.owner}
                                        <br />Ordered: {currentProduct.ordered}
                                    </CardHeader>
                                </Card>
                            )
                        }
                        else {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentProduct.name} x{currentProduct.quantity}</CardHeader>
                                    <CardHeader>Price per unit: {currentProduct.price}
                                        <br />Status: Canceled
                                    <br />Vendor: {currentProduct.owner}
                                        <br />Ordered: {currentProduct.ordered}
                                    </CardHeader>
                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}