import React, { Component } from 'react';
import axios from 'axios';

import { Input, Button, TextArea } from './inputs/inputs';

class NoteDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      note: '',
      id: 0
    }

    this.handleTitle = this.handleTitle.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.editNote = this.editNote.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleNote(event) {
    this.setState({note: event.target.value});
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const note_id = this.props.match.params.number;

    axios({
      url: `http://localhost:8000/api/notes/${note_id}/`,
      headers: {
        'Authorization': `JWT ${token}`
      },
    })
    .then(res => {
      this.setState({
        title: res.data.title,
        note: res.data.note,
        id: res.data.id
      })
    })
    .catch(error => {
      console.log("Maybe this note does not exist?");
    })
  }

  editNote(event) {
    event.preventDefault();

    const data = {
      title: this.state.title,
      note: this.state.note,
    }
    const token = localStorage.getItem("token");

    axios({
        method: 'put',
        data: data,
        headers: {
          'Authorization': `JWT ${token}`
        },
        url: `http://localhost:8000/api/notes/${this.state.id}/`
      })
      .then(res => {
        console.log("note edited");
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {

    return(
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-8 h-75">
            <form>
              <div className="form-group">
                <Input label="Title" type="text" id="note-title" placeholder="Note Title" value={this.state.title} onChange={this.handleTitle}/>
              </div>
              <div className="form-group">
                <TextArea id="note-description" label="Description" rows="7" value={this.state.note} onChange={this.handleNote} />
              </div>
              <Button type="submit" classes="btn btn-primary w-100" label="Edit Note" onClick={this.editNote}/>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NoteDetails;