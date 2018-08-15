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
    this.createNote = this.createNote.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleNote(event) {
    this.setState({note: event.target.value});
    console.log(this.state.note);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(this.props.match.params.number);
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

  createNote(event) {
    console.log("Do absolutely nothing!!");
    // event.preventDefault();

    // const data = {
    //   title: this.state.title,
    //   note: this.state.note,
    // }
    // const token = localStorage.getItem("token");

    // axios({
    //     method: 'post',
    //     data: data,
    //     headers: {
    //       'Authorization': `JWT ${token}`
    //     },
    //     url: "http://localhost:8000/api/notes/"
    //   })
    //   .then(res => {
    //     console.log("note created");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

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
              <Button type="submit" classes="btn btn-primary w-100" label="Edit Note" onClick={this.createNote}/>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NoteDetails;