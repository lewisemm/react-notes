import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import NoteCard from './NoteCard';
import {Input, TextArea, Alert }from './inputs/inputs';

const $ = window.$;

let shiftActiveClassLeft = (currentPage, requestedPage) => {
  let currentActiveButton = document.getElementById(`pageButton${currentPage}`);
  console.log(`This is the classList in ${currentActiveButton}: ${currentActiveButton.classList}`);
  currentActiveButton.classList.remove('active');

  let newActiveButton = document.getElementById(`pageButton${requestedPage}`);
  newActiveButton.classList.add('active');
}

let shiftActiveClassRight = (currentPage, requestedPage) => {
  let currentActiveButton = document.getElementById(`pageButton${currentPage}`);
  currentActiveButton.classList.remove('active');

  let newActiveButton = document.getElementById(`pageButton${requestedPage}`);
  newActiveButton.classList.add('active');
}

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    this.createNote = this.createNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.initFormModal = this.initFormModal.bind(this);
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

  initFormModal(titleValue, noteValue, event) {
    this.setState({
      title: titleValue,
      note: noteValue
    })
  }

  editNote(noteId, event) {
    event.preventDefault();
    
    if ((this.state.title.length === 0) || (this.state.note.length === 0))
      return;

    const noteData = {
      title: this.state.title,
      note: this.state.note,
    }
    const token = localStorage.getItem("token");

    axios({
        method: 'put',
        url: `http://localhost:8000/api/notes/${noteId}/`,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `JWT ${token}`
        },
        data: noteData
    })
    .then(res => {
      let {title, note} =  res.data
      let updatedCard = {}
      updatedCard[res.data.id] = {title, note}

      let notecardsCopy = Object.assign(this.state.notecards, updatedCard)

      this.setState((state) => {
        return {
          notecards: notecardsCopy,
          alertContext:"alert-success",
          alertMsg: "Note successfully edited!",
          title: "",
          note: ""
        }
      });

      $(`#editNoteModal${noteId}`).modal('hide');
      $(`#editNoteForm${noteId}`).removeClass('was-validated');
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
      let notecardsCopy = Object.assign(this.state.notecards, {});
      delete notecardsCopy[noteId];

      this.setState((state) => {
        return {
          notecards: notecardsCopy,
          alertContext:"alert-danger",
          alertMsg: "Note successfully deleted!"
        }
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
      let results = res.data.results;

      let notecardsState = {};
      results.map((item) => {
        notecardsState.id = item.id;
        notecardsState[item.id] = item;
        return null;
      });

      // notecardsState.id will still be accessible. It will have the value of the last item.id
      // We don't want this. We should only access via notecardsState[id] where id is an int
      delete notecardsState.id;

      this.setState({notecards: notecardsState});
    })
    .catch(err => {
      console.log(err);
    });
  }

  changePage(requestedPage, currentPage, event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    
    axios({
        method: 'get',
        headers: {
          'Authorization': `JWT ${token}`
        },
        url: `http://localhost:8000/api/notes/?page=${requestedPage}`,
    })
    .then(res => {
      this.setState({
        currentPage: requestedPage
      });

      this.setState({data: res.data});

      let notecardsState = {};
      this.state.data.results.map((item) => {
        notecardsState.id = item.id;
        notecardsState[item.id] = item;
        return null;
      });

      // notecardsState.id will still be accessible. It will have the value of the last item.id
      // We don't want this. We should only access via notecardsState[id] where id is an int
      delete notecardsState.id;

      this.setState({notecards: notecardsState});

      if (requestedPage > currentPage) {
        shiftActiveClassRight(currentPage, requestedPage);
      } else if (requestedPage < currentPage) {
        shiftActiveClassLeft(currentPage, requestedPage);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  createNote(event) {
    event.preventDefault();

    if ((this.state.title.length === 0) || (this.state.note.length === 0))
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
      let {title, note} = res.data
      let notecardsCopy = Object.assign({}, this.state.notecards)
      notecardsCopy[res.data.id] = {title, note}

      this.setState((state) => {
        return {
          notecards: notecardsCopy,
          alertContext: "alert-success",
          alertMsg: "Note successfully created!",
          title: "",
          note: ""
        }
      });

      $('#createNoteModal').modal('hide');
      $('#createNoteForm').removeClass('was-validated');

    });
  }

  render() {

    if (this.state.authenticated === true) {

      let notes;

      if (Object.entries(this.state.notecards) === 0) {
        notes = (
          <div className="col-12">
            <Alert alertContext="alert-warning" message="You have not created any notes so far."/>
          </div>
        );
      } else {
        notes = Object.keys(this.state.notecards).map((id, index) => {
          // TODO: Fix the search!
          // if (item.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === -1 &&
          //   item.note.toLowerCase().indexOf(this.state.searchText.toLowerCase()) === -1) {
          //   return;
          // }
          return (
            <NoteCard
              id={id}
              key={index}
              title={this.state.notecards[id]['title']}
              titleOnChange={(e) => {this.handleTitle(e)}}
              note={this.state.notecards[id]['note']}
              noteOnChange={(e) => {this.handleNote(e)}}
              onClick={this.deleteNote}
              onSubmit={this.editNote}
              initFormModal={this.initFormModal}
            />
          );
        });
      }
      
      
      return(
        <div className="container h-100">
          <div className="row">
            <div className="col">
              <ul className="nav justify-content-end ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Settings</a>
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
            {/* redesign the footer. Previous thought process hit a dead end. */}
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