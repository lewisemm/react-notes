import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { Input, NoteCard, PageFooter } from './inputs/inputs';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        results: []
      },
      authenticated: true,
      currentPage: 1
    }

    this.deleteNote = this.deleteNote.bind(this);
    this.logout = this.logout.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  deleteNote(noteId, event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    axios({
      url: `http://localhost:8000/api/notes/${noteId}/`,
      headers: {
        Authorization: `JWT ${token}`
      },
      method: 'delete'
    })
    .then(res => {

      // one note deleted. state needs to have the current data
      axios({
        method: 'get',
        headers: {
          'Authorization': `JWT ${token}`
        },
        url: "http://localhost:8000/api/notes/",
      })
      .then(res => {
        this.setState({data: res.data});
      });

    })
    .catch(error => {
      console.log("Could not delete notes");
    });

  }

  logout(event) {
    event.preventDefault();

    localStorage.removeItem("token");

    this.setState({authenticated: false});
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios({
      method: 'get',
      headers: {
        'Authorization': `JWT ${token}`
      },
      url: "http://localhost:8000/api/notes/",
    })
    .then(res => {
      this.setState({data: res.data});
    })
    .catch(err => {
      console.log(err);
    });
  }

  changePage(pageNo, event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    
    axios({
        method: 'get',
        headers: {
          'Authorization': `JWT ${token}`
        },
        url: `http://localhost:8000/api/notes/?page=${pageNo}`,
    })
    .then(res => {
      this.setState({
        data: res.data,
        currentPage: pageNo
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {

    if (this.state.authenticated === true) {

      console.log("Here ist der item count on diese side", this.state.data.count);

      const notes = this.state.data.results.map((item, index) => {
        return <NoteCard id={item.id} key={index} title={item.title} note={item.note} onClick={this.deleteNote}/>;
      });
      
      return(
        <div className="container h-100">
          <div className="row">
            <div className="col">
              <ul className="nav justify-content-end ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Settings</a>
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/login" onClick={this.logout} className="dropdown-item">Logout</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <button type="button" className="btn btn-primary">Add Note</button>
            </div>
            <div className="col-7">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" id="search-field" aria-describedby="searchHelp" placeholder="Search"/>
                  <small id="searchHelp" className="form-text text-muted">Filter notes via search.</small>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            { notes }
          </div>
          <div className="row justify-content-center page-footer">
            <PageFooter
              previous={this.state.data.previous}
              next={this.state.data.next}
              itemCount={this.state.data.count}
              onClick={this.changePage}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      );
    } else {
      return (<Redirect
                to={{
                  pathname: "/login",
                  state: {
                    alertContext: "alert-success",
                    alertMsg: "User logged out!"
                  }
                }}
              />);
    }
  }
}

export default Dashboard;