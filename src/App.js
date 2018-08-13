import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SignUp}/>
        <Route exact path="/login" component={SignIn}/>
      </Switch>
    );
  }
}

export default App;
