// import React, {Component} from 'react';
// import axios from 'axios';
// import {
//     Card , CardHeader
//   } from 'reactstrap';

// export default class DispatchedList extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {products: []}

//     }

//     componentDidMount() {
//         const user = {
//             name: localStorage.getItem('user')
//         }
//         axios.post('http://localhost:4000/orders/view/cus1',user)
//              .then(response => {
//                  axios.post('http://localhost:4000/orders/view/cus2',user)
//                     .then(response => {
//                         this.setState({products: response.data});
//                         console.log(this.state)
//                     })
//                     .catch(function(error) {
//                         console.log(error);
//              })
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
//                         if(currentUser['status']==='reviewed'){
//                             return (
//                             <Card className="p-3 text-center">
//                                     <CardHeader className="blockquote mb-0">{currentUser.order} x{currentUser.quantity}</CardHeader>
//                                     <CardHeader>Rating: {currentUser.rating}
//                                     <br/>Review: {currentUser.review}
//                                     <br/>Customer: {currentUser.customer}
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
