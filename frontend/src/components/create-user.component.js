import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            role: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeRole(event) {
        this.setState({ role: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }

        this.data(newUser)
        //.then(res => console.log(res.data));
        // .then(response => {
        //     if (response.data === 'Error: User already exists') {
        //         alert("Error: User already exists")
        //     }
        //     else {
        //         console.log('Registered')
        //     }
        //     // if (newUser.role == "vendor") {
        //     //     this.props.history.push('/vendor')
        //     // }
        //     // else{
        //     //     this.props.history.push('/customer')
        //     // }

        // })

        // .catch(err => {
        //     console.log(err)
        // })

        this.setState({
            username: '',
            email: '',
            password: '',
            role: ''
        });
    }
    async data(newUser) {
        try {
            const response = await axios.post('http://localhost:4000/add', newUser);

            if (response.data === 'Error: User already exists') {
                alert("Error: User already exists")
            }
            else {
                console.log('Registered')

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <select name="role" className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}>
                            <option value="choose" selected >Choose from list</option>
                            <option value="vendor">Vendor</option>
                            <option value="customer" defaultValue>Customer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}