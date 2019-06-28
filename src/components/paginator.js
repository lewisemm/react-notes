import React, { Component } from 'react';

export function Button(props) {
  const disabled = props.disabled || '';

  let handler;
  if (props.actionType === 'next') {
    handler = props.onClick.bind(this, props.currentPage + 1, props.currentPage);
  } else if (props.actionType === 'previous') {
    handler = props.onClick.bind(this, props.currentPage - 1, props.currentPage);
  }
  return (
    <li
      className={`page-item ${disabled}`}
      onClick={handler}
    >
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

export class PagesFooter extends Component {

  render() {
    const itemPerPage = 1, pageButtonsPerBatch = this.props.itemCount;

    let totalPages = Math.ceil(this.props.itemCount / itemPerPage);

    let batch = Array(pageButtonsPerBatch).fill(0);

    let previousButton, nextButton, pageButtons;

    pageButtons = batch.map((item, index) => {
      return (
        <PageButton
          index={index + 1}
          key={index + 1}
          active={this.props.currentPage == (index+1) ? 'active': ''}
          onClick={this.props.onClick}
          currentPage={index + 1}
        />
      );
    });

    if (this.props.currentPage == 1) {
      previousButton = <Button disabled='disabled' buttonText='Previous'/>
      nextButton = (
        <Button
          buttonText='Next'
          currentPage={this.props.currentPage}
          onClick={this.props.onClick}
          actionType='next'
        />
      );
    } else if (this.props.currentPage == totalPages) {
      previousButton = (
        <Button
          buttonText='Previous'
          currentPage={this.props.currentPage}
          onClick={this.props.onClick}
          actionType='previous'
        />
      );
      nextButton = <Button disabled='disabled' buttonText='Next'/>
    } else {
      previousButton = (
        <Button
          buttonText='Previous'
          currentPage={this.props.currentPage}
          onClick={this.props.onClick}
          actionType='previous'
        />
      );
      nextButton = (
        <Button
          buttonText='Next'
          currentPage={this.props.currentPage}
          onClick={this.props.onClick}
          actionType='next'
        />
      );
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
}