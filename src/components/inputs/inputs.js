import React from 'react';

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

export function Note(props) {
  const titleChars = props.title.length;
  const noteChars = props.title.length;

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
        <div class="card-header">
          { title }
        </div>
        <div className="card-body">
          <p className="card-text">{ note }</p>
          <a href="#" className="card-link">Details</a>
          <a href="#" className="card-link">Delete Note</a>
        </div>
      </div>
    </div>
  );
}
