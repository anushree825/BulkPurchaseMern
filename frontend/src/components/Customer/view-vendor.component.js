import React, { Component } from 'react';
import axios from 'axios';

export default class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { users: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({ users: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Average Ratings</th>
                            <th>reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((currentUser, i) => {
                                if (currentUser.role === 'vendor') {
                                    return (
                                        <tr>
                                            <td>{currentUser.username}</td>
                                            <td>{currentUser.rating_sum / currentUser.ratings}</td>
                                            <tr>{currentUser.review.map((review, i) => {
                                                return (
                                                    <td>{review}</td>
                                                )
                                            })}</tr>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}