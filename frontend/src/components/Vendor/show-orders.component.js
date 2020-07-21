import React, {Component} from 'react';
import axios from 'axios';
import {
    Card , CardHeader ,Button
  } from 'reactstrap';

export default class OrderList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
        this.dispatch = this.dispatch.bind(this);

    }
    dispatch(event) {
        // event.preventDefault();
        const del = {
            id: event.target.value
        }
        console.log (del)   
        axios.post('http://localhost:4000/product/dispatch', del)
            .then(res => {
                console.log("Product Removed");
                window.location.reload('false');
            })
            .catch(function (error) {
                console.log("ohmo");
            })
            
            
    }

    componentDidMount() {
        axios.get('http://localhost:4000/product/view')
             .then(response => {
                 this.setState({products: response.data});
                 console.log('data received');
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    
    render() {
        return (
            <div>
                { 
                    this.state.products.map((currentUser, i) => {
                        if(currentUser['owner']===localStorage.getItem('user') && currentUser['status']==='ready'){
                            return (
                            <Card className="p-3 text-center">
                                    <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.ordered}</CardHeader>
                                    <CardHeader>Price per unit: {currentUser.price}
                                    <br/>Status: ready to dispatch
                                    </CardHeader>
                                    <Button color="info" value={currentUser._id} onClick={this.dispatch}>Dispatch</Button>
                                </Card>
                            )
                        }
                    })
                }
            </div>
        )
    }
}