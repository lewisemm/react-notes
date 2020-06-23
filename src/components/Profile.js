import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';
import { baseUrl } from './utils';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      newPassword: '',
      confirmNewPassword: '',
      authenticated: false
    }

    this.updatePassword = this.updatePassword.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({newPassword: event.target.value});
  }
  
  handleConfirmPasswordChange(event) {
    this.setState({confirmNewPassword: event.target.value});
  }

  componentDidMount() {
    const token = localStorage.getItem('token') || "abcd";
    
    axios({
      method: 'get',
      url: `${baseUrl}/me/`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      },
      data: {
        'token': token
      }
    })
    .then(res => {
      // this.setState({
      //   username: res.data.username,
      //   authenticated: true
      // });

      localStorage.setItem("user_id", res.data.id);
    })
    .catch(error => {
      console.log(error);
      // this.setState({ authenticated: false });
    });
  }

  updatePassword(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const { newPassword, confirmNewPassword } = this.state;
    

    if (newPassword === confirmNewPassword) {
      axios({
        method: 'put',
        data: {
          'username': this.state.username,
          'password': newPassword
        },
        headers: {
          'Authorization': `JWT ${token}`
        },
        url: `${baseUrl}/${user_id}/`
      })
      .then(res => {
        console.log("password updated");
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  deleteUser(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    axios({
      method: "delete",
      url: `${baseUrl}/${user_id}/`,
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(res => {
      this.setState({
        authenticated: false
      });
    })
    .catch(error => {
      console.log("Could not delete user because of some weird reason");
    })

  }

  render() {

    if (this.state.authenticated === true) {

      const photo = "https://res.cloudinary.com/dh6joezbz/image/upload/v1533886803/react-notes/kitten.jpg";

      return (
        <div className="container h-100">
          <div className="row h-15 align-items-center justify-content-start">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <p className="text-center">
                <Link to="/dashboard">Back to Dashboard</Link>
              </p>
            </div>
          </div>
          <div className="row h-85 align-items-start justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-password-tab" data-toggle="pill" href="#pills-password" role="tab" aria-controls="pills-password" aria-selected="true">Change Password</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-delete-tab" data-toggle="pill" href="#pills-delete" role="tab" aria-controls="pills-delete" aria-selected="false">Delete User</a>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-password" role="tabpanel" aria-labelledby="pills-password-tab">
                  <div className="card h-100">
                    <img id="profile-photo" className="card-img-top" src={photo} alt={`Avatar of ${this.state.username}`}/>
                    <div className="card-body">
                      <h6 className="card-title text-center">{this.state.username}</h6>
                      <form className="w-75">
                        <div className="form-group">
                          <Input id="password" label="Password" type="password" value={this.state.newPassword} onChange={this.handlePasswordChange}/>
                        </div>
                        <div className="form-group">
                          <Input id="password2" label="Confirm Password" type="password" value={this.state.confirmNewPassword} onChange={this.handleConfirmPasswordChange}/>
                        </div>
                        <Button type="submit" classes="btn btn-primary w-100" label="Update Password" onClick={this.updatePassword}/>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="pills-delete" role="tabpanel" aria-labelledby="pills-delete-tab">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Delete User</h5>
                      <p className="card-text"><strong>Warning: You cannot undo this operation!</strong></p>
                      <p className="text-center"><a class="btn btn-danger" role="button" onClick={this.deleteUser}>Delete User</a></p>
                    </div>
                  </div>
                </div>




              </div>
            </div>
          </div>
        </div>
      );

    } else {

      return (<Redirect
                to={{
                  pathname: "/login",
                  state: {
                    alertContext: "alert-success",
                    alertMsg: "User deleted successfully!"
                  }
                }}
              />);
    }
  }
}

export default Profile;