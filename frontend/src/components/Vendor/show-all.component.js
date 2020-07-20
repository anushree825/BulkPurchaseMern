// import React, {Component} from 'react';
// import axios from 'axios';
// import {
//     Card, CardHeader 
//   } from 'reactstrap';

// export default class ShowAll extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {products: []}

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
//                         if(currentUser['owner']===localStorage.getItem('user')){
//                             return (
//                             <Card className="p-3 text-center">
//                                     <CardHeader className="blockquote mb-0">{currentUser.name} x{currentUser.quantity}</CardHeader>
//                                     <CardHeader>Price per unit: {currentUser.price}
//                                     <br/>Status: {currentUser.status}
//                                     <br/>Ordered: {currentUser.ordered}
//                                     </CardHeader>
//                                 </Card>
//                             )
//                         }
//                     })
//                 }
//             </div>
//         )
//     }
// }