import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import { Input, Button, Alert } from './inputs/inputs';
import { baseUrl } from './utils';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: null,
      authenticated: false,
      alertContext: '',
      alertMsg: ''
    }

    this.signInUser = this.signInUser.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  componentDidMount() {
    if (typeof(this.props.location.state) !== "undefined") {
      this.setState({
        alertContext: this.props.location.state.alertContext,
        alertMsg: this.props.location.state.alertMsg,
      });
    }
  }
  
  signInUser(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: `${baseUrl}/api-token-auth/`,
      data: {
        'username': this.state.username,
        'password': this.state.password,
      }
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      this.setState({authenticated: true });
    }).catch(error => {
      this.setState({authenticated: false });
      console.log("Error message here");
      console.log('error', error);
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
                  <Alert alertContext={ this.state.alertContext || "alert-success d-none"} message={ this.state.alertMsg || ""}/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="username" label="Username" type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="password" label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Button label="Sign In" classes="btn btn-primary w-100" onClick={this.signInUser} type="submit"/>
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
                      <p>Don't have an account? </p>
                    </div>
                    <div className="row justify-content-center">
                      <Link to="/" className="btn btn-outline-primary">Sign Up</Link>
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

export default SignIn;
