import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      return this.props.onClick();
    }
  };

  render() {
    return (
      <div onClick={this.handleKeyDown} className={s.overlay}>
        <div className={s.modal}>
          <img src={this.props.modalSrc} alt="" width="1080" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  modalSrc: PropTypes.string.isRequired,
};

export default Modal;
