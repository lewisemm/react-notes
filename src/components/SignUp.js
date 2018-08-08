import React, { Component } from 'react';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';

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

      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <form className="w-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="username" label="Username" type="text"/>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="form-group col-4">
                  <Input id="password" label="Password" type="password"/>
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
                      <Button label="Log In" onClick="" classes="btn btn-outline-primary w-100" type="button"/>
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
