import React from 'react';
import { Link } from 'react-router-dom';

export function Input(props) {
  
  const describedBy = `${props.id}Help`;
  const feedbackId = `${props.id}Feedback`;

  return (
    props.required ? (
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
          required
        />
        <div id={feedbackId} className="invalid-feedback">{ props.feedback }</div>
      </div>
    ): (
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
    )
    
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
  const describedBy = `${props.id}Help`;
  const feedbackId = `${props.id}Feedback`;
  return (

    props.required ? (
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          className="form-control"
          id={props.id}
          aria-describedby={describedBy}
          rows={props.rows}
          placeholder={props.label}
          value={props.value}
          onChange={props.onChange}
          required>
        </textarea>
        <div id={feedbackId} className="invalid-feedback">{ props.feedback }</div>
      </div>
    ) : (
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          className="form-control"
          id={props.id}
          aria-describedby={describedBy}
          rows={props.rows}
          placeholder={props.label}
          value={props.value}
          onChange={props.onChange}>
        </textarea>
      </div>
    )

  );
}

export function NoteCard(props) {
  const titleChars = props.title.length;
  const noteChars = props.note.length;
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

  handleForm = () {
    // the notecard component probably needs to be a class because we need the functions
    // to post and manage the state of the text input fields in this modal
    // TODO: Convert NoteCard to class based component since it's no longer presentational.
  }
  
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 note-margin">
      <div className="card">
        <div className="card-header">
          { title }
        </div>
        <div className="card-body">
          <p className="card-text">{ note }</p>
          <Link to={`/notes/${props.id}`} className="card-link">Edit Note</Link>

          <FormModal
            id={props.id}
            modalTitle="Edit Note Details"
            titleLabel="Title"
            titleValue={props.titleValue}
            onChange={props.handleTitle}
            descriptionLabel={props.descriptionLabel}
            descriptionValue={props.descriptionValue}
            onChange={can we have 2 of these?}
          />
          
          <a href={`#modalId${props.id}`} data-toggle="modal" className="card-link">Delete Note</a>
        </div>
        <YesNoModal id={props.id} modalTitle="Delete Note?" modalBody="This operation cannot be undone!" buttonLabel="Delete" onClick={props.onClick}/>
      </div>
    </div>
  );
}

export function YesNoModal(props) {

  return (
    <div className="modal fade" id={`modalId${props.id}`} tabIndex="-1" role="dialog" aria-labelledby={`modalId${props.id}Title`} aria-hidden="true">
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

export function FormModal(props) {
  return (
    <div className="modal fade" id={`formModal${props.id}`} tabIndex="-1" role="dialog" aria-labelledby={`formModal${props.id}Title`} aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`formModal${props.id}Title`}>{props.modalTitle}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form noValidate className="needs-validation" onSubmit={props.handleForm} id={`formModalForm${props.id}`}>
              <div className="form-group">
                <label for={`note-title${props.id}`}>{props.titleLabel}</label>
                <Input type="text" id={`note-title${props.id}`} placeholder={props.titleLabel} value={props.titleValue} onChange={props.onChange} required feedback="Title is a required field!"/>
              </div>
              <div className="form-group">
                <label for={`note-description${props.id}`}>{props.descriptionLabel}</label>
                <TextArea id={`note-description${props.id}`} label={props.descriptionLabel} rows="7" value={props.descriptionValue} onChange={props.onChange} required feedback="Description is a required field!"/>
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Alert(props) {
  return (
    <div className={`alert ${props.alertContext}`} role="alert">
      { props.message }
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export function PageFooter(props) {

  const itemCount = props.itemCount === undefined ? 1 : props.itemCount;
  const pageCount = Math.ceil(itemCount / 12);
  const pages = Array(pageCount).fill(0);


  const previousButton = (
    props.currentPage === 1 ?
    <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li> :
    <li
      className="page-item"
      onClick={props.onClick.bind(this, props.currentPage - 1)}>
      <a className="page-link" href="#">Previous</a>
    </li>
  );

  const nextButton = (
    props.currentPage === pageCount ?
    <li className="page-item disabled"><a className="page-link" href="#">Next</a></li> :
    <li
      className="page-item"
      onClick={props.onClick.bind(this, props.currentPage + 1)}>
      <a className="page-link" href="#">Next</a>
    </li>
  );


  const pageButtons = pages.map((item, index) => {
    if (props.currentPage === (index + 1) ) {
      return <li
              key={index + 1}
              className="page-item active"
              onClick={props.onClick.bind(this, index + 1)}>
              <a className="page-link" href="#">{ index + 1 }</a>
            </li>;
    }
    return <li
            key={index + 1}
            className="page-item"
            onClick={props.onClick.bind(this, index + 1)}>
            <a className="page-link" href="#">{ index + 1 }</a>
          </li>;
  });

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        { previousButton }
        { pageButtons }
        { nextButton }
      </ul>
    </nav>
  );
}
