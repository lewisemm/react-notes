import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { YesNoModal, FormModal } from './inputs/inputs';

class NoteCard extends Component {

  constructor(props) {
    super(props);

    this.setState = {
      title: "",
      note: ""
    }

    this.handleTitle = this.handleTitle.bind(this);
    this.handleNote = this.handleNote.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.target.value});
  }

  handleNote(event) {
    this.setState({note: event.target.value});
  }

  handleForm(event) {
    event.preventDefault();
    if ((this.state.title.length == 0) || (this.state.note.length == 0))
      return;
  }

  render() {
    const titleChars = this.props.title.length;
    const noteChars = this.props.note.length;
    let title = '', note = '';
    
    if (titleChars >0 && titleChars < 43) {
      title = this.props.title;
    } else {
      title = `${this.props.title.slice(0, 38)} ...`;
    }
    
    if (noteChars >0 && noteChars < 43) {
      note = this.props.note;
    } else {
      note = `${this.props.note.slice(0, 38)} ...`;
    }
    
    return (
      <div className="col-lg-4 col-md-6 col-sm-12 note-margin">
        <div className="card">
          <div className="card-header">
            { title }
          </div>
          <div className="card-body">
            <p className="card-text">{ note }</p>

            <a href={`#formModal${this.props.id}`} data-toggle="modal" className="card-link">Edit Note</a>

            <a href={`#modalId${this.props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
          </div>
          <YesNoModal id={this.props.id} modalTitle="Delete Note?" modalBody="This operation cannot be undone!" buttonLabel="Delete" onClick={this.props.onClick}/>
        </div>
        <FormModal
          id={this.props.id}
          key={this.props.id}
          modalTitle='Edit Note Details'
          handleForm={this.handleForm}
          titleLabel='Title'
          titleValue={this.props.title}
          titleOnChange={this.handleTitle}
          descriptionLabel='Description'
          descriptionValue={this.props.note}
          descriptionOnChange={this.handleNote}
        />
      </div>
    );
  }
}

export default NoteCard;