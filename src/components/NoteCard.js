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

            <a href={`#editNoteModal${this.props.id}`} data-toggle="modal" className="card-link">Edit Note</a>

            <a href={`#modalId${this.props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
          </div>
          <YesNoModal id={this.props.id} modalTitle="Delete Note?" modalBody="This operation cannot be undone!" buttonLabel="Delete" onClick={this.props.onClick}/>
          {/* Modal */}
          <div className="modal fade" tabIndex="-1" role="dialog" id={`editNoteModal${this.props.id}`}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form noValidate className="needs-validation" onSubmit={this.props.onSubmit.bind(this, this.props.id)}>

                  <div className="modal-header">
                    <h5 className="modal-title">Edit Note Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="editNoteTitle">Title</label>
                      <input type="text" className="form-control" id="editNoteTitle" placeholder="Title" onChange={this.props.titleOnChange} defaultValue={this.props.title} required feedback="Title is a required field!"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="editNoteDescription">Description</label>
                      <input type="text" className="form-control" id="editNoteDescription" placeholder="Description" defaultValue={this.props.note} onChange={this.props.noteOnChange} required feedback="Description is a required field!"/>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoteCard;