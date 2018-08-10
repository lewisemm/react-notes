import React, { Component } from 'react';
import axios from 'axios';

import { Input, Button } from './inputs/inputs';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    const photo = "https://res.cloudinary.com/dh6joezbz/image/upload/v1533886803/react-notes/kitten.jpg";
     
    return (
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-6 h-75">
            <div class="card h-100">
              <img id="profile-photo" class="card-img-top" src={photo} alt="Profile Photo"/>
              <div class="card-body">
                <p class="card-title text-center">Username</p>
                <form class="w-75">
                  <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label for="password2">Confirm Password</label>
                    <input type="password" className="form-control" id="password2" placeholder="Confirm Password" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Update Password</button>
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