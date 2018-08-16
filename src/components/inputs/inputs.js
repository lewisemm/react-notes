import React from 'react';
import { Link } from 'react-router-dom';

export function Input(props) {
  
  const describedBy = `${props.id}Help`;

  return (
    <div>
    <label htmlFor={props.id}>{props.label}</label>
    <input
      type={props.type}
      className="form-control"
      id={props.id}
      aria-describedby={describedBy}
      placeholder={props.label}
      value={props.value}
      onChange={props.onChange}
    />
    </div>
  );
}

export function Button(props) {
  return (
    <button
      type={props.type}
      className={props.classes}
      onClick={props.onClick}>{ props.label }
    </button>
  );
}

export function TextArea(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <textarea
        className="form-control"
        id={props.id}
        rows={props.rows}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}>
      </textarea>
    </div>
  );
}

export function NoteCard(props) {
  const titleChars = props.title.length;
  const noteChars = props.title.length;
  // <Link></Link>

  let title = '', note = '';

  if (titleChars >0 && titleChars < 44) {
    title = props.title;
  } else {
    title = `${props.title.slice(0, 40)} ...`;
  }

  if (noteChars >0 && noteChars < 44) {
    note = props.note;
  } else {
    note = `${props.note.slice(0, 40)} ...`;
  }
  
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 note-margin">
      <div className="card">
        <div className="card-header">
          { title }
        </div>
        <div className="card-body">
          <p className="card-text">{ note }</p>
          <Link to={`/notes/${props.id}`} className="card-link">Details</Link>
          
          <a href={`#modalId${props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
        </div>
        <Modal id={props.id} modalTitle="Delete Note?" modalBody="You cannot recover from this operation!" buttonLabel="Delete" onClick={props.onClick}/>
      </div>
    </div>
  );
}

export function Modal(props) {

  return (
    <div className="modal fade" id={`modalId${props.id}`} tabindex="-1" role="dialog" aria-labelledby={`modalId${props.id}Title`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`modalId${props.id}Title`}>{props.modalTitle}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.modalBody}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
            <button type="button" data-dismiss="modal" className="btn btn-danger" onClick={props.onClick.bind(this, props.id)}>{props.buttonLabel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
