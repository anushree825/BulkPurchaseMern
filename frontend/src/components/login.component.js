import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        this.Data(newUser);
        // //.then(res => console.log(res.data));
        // .then(res => {
        //     console.log(res.data)
        //     if (res.data === "Error: User does not exist") {
        //         alert("Error: User does not exist")
        //     }
        //     else {
        //         if (res.data === 'Error: Passwords do not match') {
        //             alert('Error: Incorrect username or password')
        //         }
        //         else {
        //             console.log("Successfully logged in")
        //         }
        //     }
        //     // if (response.data.role == 'vendor') {
        //     //     console.log(response.data.role)
        //     //     this.props.history.push('./components/vendor.component')
        //     // }
        //     // else//(response.data = 'customer')
        //     // {
        //     //     console.log(response.data.role)
        //     //     this.props.history.push('./components/customer.component')
        //     // }
        //     // localStorage.setItem('usertoken', response.data)
        //     // return response.data
        // })
        // .catch(err => {
        //     console.log(err.data)
        // })

        this.setState({
            username: '',
            password: '',
        });
    }
    async Data(newUser) {
        try {
            const res = await axios.post('http://localhost:4000/login', newUser)
            console.log(res.data)
            if (res.data === "Error: User does not exist") {
                alert("Error: User does not exist")
            }
            else {
                if (res.data === 'Error: Passwords do not match') {
                    alert('Error: Incorrect username or password')
                }
                else {
                    console.log("Successfully logged in")
                    if(res.data === "customer")
                    this.props.history.push('/customer');
                    else if(res.data === "vendor")
                    this.props.history.push('/vendor');
                }
            }
        }
        catch (error) {
            console.log(error);
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
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}