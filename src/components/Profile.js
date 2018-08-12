import React, { Component } from 'react';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      newPassword: '',
      confirmNewPassword: ''
    }

    this.updatePassword = this.updatePassword.bind(this);
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
    const token = localStorage.getItem('token');

    
    if (token && token.length > 0) {

      axios({
        method: 'get',
        url: "http://localhost:8000/api/me/",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        },
        data: {
          'token': token
        }
      })
      .then(res => {
        this.setState({ 'username': res.data.username});
        localStorage.setItem("user_id", res.data.id);
      })
      .catch(error => {
        console.log("redirect to login using react router");
        console.log(error);
      });
    } else {
      console.log("No token hence the redirect to login");
    }
  }

  updatePassword(event) {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const { newPassword, confirmNewPassword } = this.state;
    const url = "http://localhost:8000/api/users";
    

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
        url: `${url}/${user_id}/`
      })
      .then(res => {
        console.log("password updated");
      })
      .catch(error => {
        console.log(error);
      })
    }


  }

  render() {
    const photo = "https://res.cloudinary.com/dh6joezbz/image/upload/v1533886803/react-notes/kitten.jpg";
     
    return (
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-6 h-75">
            <div className="card h-100">
              <img id="profile-photo" className="card-img-top" src={photo} alt="Profile Photo"/>
              <div className="card-body">
                <p className="card-title text-center">{this.state.username}</p>
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
        </div>
      </div>
    );

  }
}

export default Profile;