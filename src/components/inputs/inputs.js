import React from 'react';

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
          defaultValue={'' || props.defaultValue}
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
          defaultValue={'' || props.defaultValue}
          onChange={props.onChange}>
        </textarea>
      </div>
    )

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
    <div className="modal fade" tabIndex="-1" role="dialog" id={`editNoteModal${props.id}`}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form noValidate className="needs-validation" onSubmit={props.onSubmit.bind(this, props.id)} id={`editNoteForm${props.id}`}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Note Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="editNoteTitle">Title</label>
                <input type="text" className="form-control" id={`editNoteTitle${props.id}`} placeholder="Title" onChange={props.titleOnChange} defaultValue={props.title} required/>
                <div id={`titleFeedbackId${props.id}`} className="invalid-feedback">Title is a required field!</div>
              </div>
              <div className="form-group">
                <TextArea
                  id={`editNoteDescription${props.id}`}
                  label="Description"
                  rows="7"
                  defaultValue={props.note}
                  onChange={props.noteOnChange}
                  feedback="Description is a required field!"
                  required
                />
                <div id={`noteFeedbackId${props.id}`} className="invalid-feedback">Description is a required field!</div>
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
    <li className="page-item disabled"><a className="page-link">Previous</a></li> :
    <li
      className="page-item"
      onClick={props.onClick.bind(this, props.currentPage - 1)}>
      <a className="page-link">Previous</a>
    </li>
  );

  const nextButton = (
    props.currentPage === pageCount ?
    <li className="page-item disabled"><a className="page-link">Next</a></li> :
    <li
      className="page-item"
      onClick={props.onClick.bind(this, props.currentPage + 1)}>
      <a className="page-link">Next</a>
    </li>
  );


  const pageButtons = pages.map((item, index) => {
    if (props.currentPage === (index + 1) ) {
      return <li
              key={index + 1}
              className="page-item active"
              onClick={props.onClick.bind(this, index + 1)}>
              <a className="page-link">{ index + 1 }</a>
            </li>;
    }
    return <li
            key={index + 1}
            className="page-item"
            onClick={props.onClick.bind(this, index + 1)}>
            <a className="page-link">{ index + 1 }</a>
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
