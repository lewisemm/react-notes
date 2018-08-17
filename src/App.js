import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import NotesDetails from './components/NotesDetails';
import Dashboard from './components/Dashboard';

import logo from './logo.svg';
import './App.css';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  // let resp = axios({
  //   url: "http://localhost:8000/api/me/",
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `JWT ${token}`
  //   },
  //   method: 'get',
  //   data: {
  //     'token': token
  //   }
  // });

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}




class App extends Component {

  
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={SignIn}/>
        <AuthenticatedRoute exact path="/profile" component={Profile}/>
        <AuthenticatedRoute exact path="/notes/:number" component={NotesDetails}/>
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/" component={SignUp}/>
      </Switch>
    );
  }
}

export default App;
