import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Searchbar from './Searchbar';
import Modal from 'components/Modal';
import imagesAPI from '../services/images-api';
import s from './App.module.css';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    status: 'idle',
    error: null,
    modalSrc: '',
    page: 1,
    totalImages: null,
    isVisibleLoadButton: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      await imagesAPI
        .fetchImages(searchName, page)
        .then(images => {
          if (images.hits.length !== 0) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
              totalImages: images.totalHits,
              isVisibleLoadButton: true,
            }));
          }
          return Promise.reject(
            new Error(`No results were found for '${searchName}'`)
          );
        })
        .catch(error => {
          toast.error('Enter another text');
          this.setState({ error, status: 'rejected' });
        });
    }

    if (page !== 1 && prevState.page !== page) {
      const { height: cardHeight } = document
        .querySelector('ul')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2.3,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName, status: 'pending', page: 1, images: [] });
  };

  handleModalSrc = modalSrc => {
    this.setState({ modalSrc });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isVisibleLoadButton: false,
    }));
  };

  render() {
    const {
      status,
      error,
      images,
      page,
      totalImages,
      isVisibleLoadButton,
      modalSrc,
    } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <span>Enter word for search images</span>}
        {status === 'rejected' && <span>{error.message}</span>}

        {status === 'resolved' && (
          <ImageGallery articles={images} onClick={this.handleModalSrc} />
        )}
        {status === 'resolved' &&
          totalImages > page * 12 &&
          isVisibleLoadButton && <Button onClick={this.loadMore} />}
        {status === 'pending' ||
          (!isVisibleLoadButton && (
            <BallTriangle color="#3f51b5" height={60} width={60} />
          ))}

        {modalSrc && (
          <Modal onClick={this.handleModalSrc} modalSrc={modalSrc} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
