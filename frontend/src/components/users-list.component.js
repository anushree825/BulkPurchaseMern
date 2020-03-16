import React, { Component } from 'react';
import axios from 'axios';



export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        this.Data();
        // .then(response => {
        //             this.setState({ users: response.data });
        //         });

        // axios.get('http://localhost:4000/')
        //     .then(response => {
        //         this.setState({ users: response.data });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }
    async Data() {
        try {
            const response = await axios.get('http://localhost:4000/');
            const {data} = await response;
            this.setState({ users: data })
        }
        catch (error){
            console.log(error);
        }
    };
    // async function Data() {
    //     try {
    //         const response = await axios.get('http://localhost:4000/');
    //         const {data} = await response;
    //         this.setState({ users: data })
    //     }
    //     catch (error){
    //         console.log(error);
    //     }
    // };

    render() {
        return (
            <div>
                <h3>UsersList</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.username}</td>
                                        <td>{currentUser.email}</td>
                                        <td>{currentUser.password}</td>
                                        <td>{currentUser.role}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}