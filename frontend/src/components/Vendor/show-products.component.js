import React, { Component } from 'react'
import axios from 'axios'
import {
    Card, CardHeader, Button
} from 'reactstrap'

// import Vendor from '../Vendor'

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] }
        this.remove = this.remove.bind(this)

    }
    remove(event) {
        // event.preventDefault();
        const del = {
            id: event.target.value
        }

        this.data(del)
        
        window.location.reload('false'); 
    }

    async data(del) {
        try {
            const res = await axios.post('http://localhost:4000/product/delete', del);
            
            console.log(res.data)
            if (res.data === 'Error') {
                alert("Error")
            }
            else {
                console.log('Product Deleted')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    render() {
        return (
            <div>
                {
                    this.state.products.map((currentUser, i) => {
                        if (currentUser['owner'] === localStorage.getItem('user') && currentUser['status'] === 'waiting') {
                            return (
                                <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
                                    <CardHeader>Price per unit:{currentUser.price}
                                        <br />Status:{currentUser.status}
                                    </CardHeader>
                                    <Button color="danger" value={currentUser._id} onClick={this.remove}>Remove</Button>
                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}