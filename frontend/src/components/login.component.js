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

    // componentDidMount() {
    //     axios.get('http://localhost:4000/login')
    //          .then(response => {
    //              this.setState({users: response.data});
    //          })
    //          .catch(function(error) {
    //              console.log(error);
    //          })
    // }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post('http://localhost:4000/login', newUser)
            //.then(res => console.log(res.data));
            .then(res => {
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
                    }
                }
                // if (response.data.role == 'vendor') {
                //     console.log(response.data.role)
                //     this.props.history.push('./components/vendor.component')
                // }
                // else//(response.data = 'customer')
                // {
                //     console.log(response.data.role)
                //     this.props.history.push('./components/customer.component')
                // }
                // localStorage.setItem('usertoken', response.data)
                // return response.data
            })
            .catch(err => {
                console.log(err.data)
                // if (err.data === "User does not exist") {
                //         alert("User does not exist")
                //     }

            })

        this.setState({
            username: '',
            password: '',
        });
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