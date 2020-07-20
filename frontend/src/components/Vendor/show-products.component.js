// import React, {Component} from 'react';
// import axios from 'axios';
// import {
//     Card, CardHeader ,Button
//   } from 'reactstrap';

// export default class ProductList extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {products: []}
//         this.remove = this.remove.bind(this);

//     }
//     remove(event){
//         const del = {
//             id : event.target.value
//         }
//         axios.post('http://localhost:4000/product/delete',del)
//                 .then(res => console.log(res.data));
//         window.location.reload('false');
//     }

//     componentDidMount() {
//         axios.get('http://localhost:4000/product/view')
//              .then(response => {
//                  this.setState({products: response.data});
//                  console.log()
//              })
//              .catch(function(error) {
//                  console.log(error);
//              })
//     }


//     render() {
//         return (
//             <div>
//                 { 
//                     this.state.products.map((currentUser, i) => {
//                         if(currentUser['owner']===localStorage.getItem('user') && currentUser['status']==='waiting'){
//                             return (
//                             <Card className="p-3 text-center">
//                                     <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
//                                     <CardHeader>Price per unit:{currentUser.price}
//                                     <br/>Status:{currentUser.status}
//                                     </CardHeader>
//                                     <Button color="danger" value={currentUser._id} onClick={this.remove}>Remove</Button>
//                                 </Card>
//                             )
//                         }
//                     })
//                 }
//             </div>
//         )
//     }
// }