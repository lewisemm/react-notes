import React, { Component } from 'react';

export function Button(props) {
  const disabled = props.disabled || '';
  return (
    <li className={`page-item ${disabled}`}>
      <a className="page-link" href="#">{props.buttonText}</a>
    </li>
  );
}

export function PageButton(props) {
  const active = props.active || '';
  const index = props.index;
  return (
    <li
      id={`pageButton${index}`}
      className={`page-item ${active}`}
      onClick={props.onClick.bind(this, index, props.currentPage)}>
      <a className="page-link" href="#">{index}</a>
    </li>
  );
}

export function PagesFooter(props) {
  const pageCount = Math.ceil(props.itemCount / 12);
  const pages = Array(pageCount).fill(0);

  let previousButton, nextButton;

  let pageButtons = pages.map((item, index) => {
    return (
      <PageButton
        index={index + 1}
        key={index + 1}
        active={props.currentPage == (index+1) ? 'active': ''}
        onClick={props.onClick}
        currentPage={props.currentPage}
      />
    );
  });

  if (props.currentPage == 1) {
    previousButton = <Button disabled='disabled' buttonText='Previous'/>
    nextButton = <Button buttonText='Next'/>
  } else if (props.currentPage == props.itemCount) {
    previousButton = <Button buttonText='Previous'/>
    nextButton = <Button disabled='disabled' buttonText='Next'/>
  }

  return (
    <nav aria-label="Page Footer Button Navigation">
      <ul className="pagination">
        { previousButton }
        { pageButtons }
        { nextButton }
      </ul>
    </nav>
  );
}
