import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchName: '',
  };
  handleNameChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      toast.info('Enter text');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.reset();
  };

  reset = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmitForm} className={s.form}>
          <button type="submit" className={s.button}>
            <FcSearch size="2em" />
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
