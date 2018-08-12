import React, { Component } from 'react';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';
import { Alert } from './alerts/alerts';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMsg: '',
      token: null
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
  
  signInUser(event) {
    event.preventDefault();

    const url = "http://localhost:8000/api/api-token-auth/";

    const data = {
      'username': this.state.username,
      'password': this.state.password,
    }

    axios.post(url, data).then(res => {
      localStorage.setItem('token', res.data.token);
    }).catch(err => {
      console.log(err);
    });
  }


  render() {

    return (

      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <form className="w-100">
            <div className="container">
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
                  <Alert classes="alert alert-danger" message={this.state.token}/>
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
                      <Button label="Change onClick handler here too" classes="btn btn-outline-primary w-100" type="button"/>
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
