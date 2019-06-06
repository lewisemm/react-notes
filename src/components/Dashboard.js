import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import NoteCard from './NoteCard';
import {
  Input, PageFooter,
  Button, TextArea, Alert }
  from './inputs/inputs';

const $ = window.$;

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        results: []
      },
      authenticated: true,
      currentPage: 1,
      searchText: "",
      title: "",
      note: "",
      alertContext: "",
      alertMsg: "",
      notecards: {}
    }

    this.deleteNote = this.deleteNote.bind(this);
    this.logout = this.logout.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.refreshNotes = this.refreshNotes.bind(this);
    this.createNote = this.createNote.bind(this);
  }

  handleSearchText(event) {
    this.setState({searchText: event.target.value});
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleNote(event) {
    this.setState({note: event.target.value});
  }

  refreshNotes(token) {
    axios({
      method: 'get',
      headers: {
        'Authorization': `JWT ${token}`
      },
      url: "http://localhost:8000/api/notes/",
    })
    .then(res => {
      this.setState(
        {
          data: {
            results: res.data
          }
        }
      );
    });
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
      this.refreshNotes(token);
      this.setState(
        {
          alertContext:"alert-danger",
          alertMsg: "Note successfully deleted!"
        }
      );
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
      this.setState(
        {
          data: {
            results: res.data
          }
        }
      );

      let notecardsState = {};
      this.state.data.results.map((item, index) => {
        const note = {
          "title": item.title,
          "note": item.note,
        };

        notecardsState.id = item.id
        notecardsState[item.id] = note;
      });

      this.setState(prevState => {
        // create a copy of state variable notecards
        let notecards = Object.assign(notecardsState, prevState.notecards);
        return { notecards };
      });
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
        data: {
          results: res.data,
        },
        currentPage: pageNo
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  createNote(event) {
    event.preventDefault();

    if ((this.state.title.length == 0) || (this.state.note.length == 0))
      return;

    const noteData = {
      title: this.state.title,
      note: this.state.note,
    }
    const token = localStorage.getItem("token");

    axios({
        method: 'post',
        url: "http://localhost:8000/api/notes/",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `JWT ${token}`
        },
        data: noteData
    })
    .then(res => {
      this.refreshNotes(token);
      this.setState(
        {
          alertContext:"alert-success",
          alertMsg: "Note successfully created!",
          title: "",
          note: ""
        }
      );
      $('#createNoteModal').modal('hide');
      $('#createNoteForm').removeClass('was-validated');

    });
  }

  render() {

    if (this.state.authenticated === true) {

      let notes;

      if (typeof(this.state.data.results) === 'undefined' || this.state.data.results.length === 0) {
        notes = (
          <div className="col-12">
            <Alert alertContext="alert-warning" message="You have not created any notes so far."/>
          </div>
        );
      } else {
        notes = this.state.data.results.map((item, index) => {

          if (item.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === -1 &&
            item.note.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === -1) {
            return;
          }
          // return <NoteCard id={item.id} key={index} title={this.state.notecards[item.id].title} note={this.state.notecards[item.id].note} onClick={this.deleteNote}/>;
          return <NoteCard id={item.id} key={index} title={item.title} note={item.note} notecards={this.state.notecards[item.id].title} onClick={this.deleteNote}/>;
        });
      }
      
      
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
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createNoteModal">
                Add Note
              </button>
            </div>
            <div className="col-7">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" id="search-field" aria-describedby="searchHelp" placeholder="Search" value={this.state.searchText} onChange={this.handleSearchText}/>
                  <small id="searchHelp" className="form-text text-muted">Filter notes via search.</small>
                </div>
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-6">
              <Alert alertContext={this.state.alertContext || "alert-success d-none"} message={this.state.alertMsg || ""}/>
            </div>
          </div>
          <div className="row h-75">
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
          <div className="modal fade" id="createNoteModal" tabIndex="-1" role="dialog" aria-labelledby="createNoteLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form noValidate className="needs-validation" onSubmit={this.createNote} id="createNoteForm">
                  <div className="modal-header">
                    <h5 className="modal-title" id="createNoteLabel">Create a new note.</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <Input label="Title" type="text" id="note-title" placeholder="Note Title" value={this.state.title} onChange={this.handleTitle} required feedback="Title is a required field!"/>
                    </div>
                    <div className="form-group">
                      <TextArea id="note-description" label="Description" rows="7" value={this.state.note} onChange={this.handleNote} required feedback="Description is a required field!"/>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
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
                    alertMsg: "User logged out!"
                  }
                }}
              />);
    }
  }
}

export default Dashboard;