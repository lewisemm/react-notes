import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import NotesDetails from './components/NotesDetails';
import Dashboard from './components/Dashboard';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={SignIn}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/notes/:number" component={NotesDetails}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/" component={SignUp}/>
      </Switch>
    );
  }
}

export default App;
