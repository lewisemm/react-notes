import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Input, NoteCard } from './inputs/inputs';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: []
    }

    this.deleteNote = this.deleteNote.bind(this);
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
        this.setState({notes: res.data});
      });

    })
    .catch(error => {
      console.log("Could not delete notes");
    });

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
        this.setState({notes: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    const notes = this.state.notes.map((item, index) => {
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
                  <a className="dropdown-item" href="#">Logout</a>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Dashboard;