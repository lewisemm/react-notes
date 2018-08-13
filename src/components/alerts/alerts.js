import React from 'react';

export function Alert(props) {
  
  return (
    <div className={props.classes} role="alert">{props.message}</div>
  );
}