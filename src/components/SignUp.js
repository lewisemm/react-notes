import React, { Component } from 'react';
import axios from 'axios';

import './signin.css';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password2: ''
    }

    this.createUser = this.createUser.bind(this);
  }

  createUser() {
    const url = 'http://localhost:8000/api';

    const formdata = new FormData();
    formdata.append('username', document.getElementById('username').value);
    formdata.append('password', document.getElementById('password').value);

    axios.post(`${url}/users/`, formdata);

  }

  render() {

    return (
      <form>
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-group col-4">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" />
              <small id="usernameHelp" className="form-text text-muted">Type in a username.</small>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-4">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-4">
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" className="form-control" id="password2" placeholder="Confirm Password" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-4">
              <button type="submit" className="btn btn-primary" onClick={this.createUser}>Create Account</button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="form-group col-4">
              <span>Have an account? </span>
              <button type="button" className="btn btn-outline-primary">Log In</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

}

export default SignUp;
