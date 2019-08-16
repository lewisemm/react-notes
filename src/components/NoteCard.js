import React from 'react';

import { YesNoModal, FormModal } from './inputs/inputs';

let titleShortener = (propTitle) => {
  let title, titleChars = propTitle.length;

  if (titleChars >0 && titleChars < 43) {
    title = propTitle;
  } else {
    title = `${propTitle.slice(0, 38)} ...`;
  }

  return title;
}

let noteShortener = (propNote) => {
  let note, noteChars = propNote.length;

  if (noteChars >0 && noteChars < 43) {
    note = propNote;
  } else {
    note = `${propNote.slice(0, 38)} ...`;
  }

  return note;
}

export default function NoteCard(props) {

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 note-margin">
      <div className="card">
        <div className="card-header">
          { titleShortener(props.title) }
        </div>
        <div className="card-body">
          <p className="card-text">{ noteShortener(props.note) }</p>

          <a href={`#editNoteModal${props.id}`} data-toggle="modal" className="card-link" onClick={props.initFormModal.bind(this, props.title, props.note)}>Edit Note</a>

          <a href={`#modalId${props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
        </div>
        <YesNoModal id={props.id} modalTitle="Delete Note?" modalBody="This operation cannot be undone!" buttonLabel="Delete" onClick={props.onClick}/>
        <FormModal
          id={props.id}
          onSubmit={props.onSubmit}
          title={props.title}
          titleOnChange={props.titleOnChange}
          note={props.note}
          noteOnChange={props.noteOnChange}
          />
      </div>
    </div>
  );
  
}