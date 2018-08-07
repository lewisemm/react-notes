import React, { Component } from 'react';

class SignUp extends Component {

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
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
          </div>
        </div>
      </form>
    );
  }

}

export default SignUp;
