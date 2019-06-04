import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { YesNoModal } from './inputs/inputs';

class NoteCard extends Component {

  constructor(props) {
    super(props);
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
            <Link to={`/notes/${this.props.id}`} className="card-link">Edit Note</Link>
            <a href={`#modalId${this.props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
          </div>
          <YesNoModal id={this.props.id} modalTitle="Delete Note?" modalBody="This operation cannot be undone!" buttonLabel="Delete" onClick={this.props.onClick}/>
        </div>
      </div>
    );
  }
}

export default NoteCard;