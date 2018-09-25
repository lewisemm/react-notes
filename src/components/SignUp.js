import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';
import { Alert } from './alerts/alerts';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password2: '',
      errorMsg: '',
      authenticated: false
    }

    this.createUser = this.createUser.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  createUser(event) {
    event.preventDefault();
    const url = 'http://localhost:8000/api';

    let password2 = document.getElementById('password2').value;

    let data = {
      "username": this.state.username,
      "password": this.state.password,
    }

    if (this.state.password === password2) {
      axios.post(`${url}/users/`, data)
        .then((res) => {
          // use newly created credentials to fetch token and store
           // it in localStorage
          axios.post(`${url}/api-token-auth/`, data)
            .then((res) => {
              localStorage.setItem('token', res.data.token);
              this.setState({authenticated: true });
            })
            .catch((error) => {
              console.log(error);
              this.setState({authenticated: false });
            })
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        errorMsg: "Passwords do not match!"
      });
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios({
      method: "post",
      url: "http://localhost:8000/api/api-token-verify/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
      data: {
        token: token
      }
    })
    .then(res => {
      this.setState({authenticated: true });
    })
    .catch(error => {
      this.setState({authenticated: false });
    });
  }

  render() {

    if (this.state.authenticated === true) {
      return <Redirect to="/dashboard" />
    }

    return (

      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <form className="w-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="username" label="Username" value={this.state.username} onChange={this.handleUsernameChange} type="text"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="password" label="Password" value={this.state.password} onChange={this.handlePasswordChange} type="password"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="password2" label="Confirm Password" type="password"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Button label="Create Account" onClick={this.createUser} classes="btn btn-primary w-100" type="submit"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <hr/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <div className="container">
                    <div className="row justify-content-center">
                      <p>Have an account? </p>
                    </div>
                    <div className="row justify-content-center">
                      <Link to="/login" className="btn btn-outline-primary">Sign In</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

}

export default SignUp;
