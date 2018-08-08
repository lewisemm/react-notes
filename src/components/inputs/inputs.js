import React from 'react';

export function Input(props) {
  
  const describedBy = `${props.id}Help`;

  return (
    <div>
    <label htmlFor={props.id}>{props.label}</label>
    <input type={props.type} className="form-control" id={props.id} aria-describedby={describedBy} placeholder={props.label} />
    </div>
  );
}

export function Button(props) {
  return (
    <button type={props.type} className={props.classes} onClick={props.onClick}>{ props.label }</button>
  );

}