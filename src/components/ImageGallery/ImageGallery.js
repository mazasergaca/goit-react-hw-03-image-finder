import { Component } from 'react';

import { BallTriangle } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';

import Button from 'components/Button';
import s from './ImageGallery.module.css';
import Modal from 'components/Modal';

const API_KEY = '25910562-a2104437e4307ded07a843390';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    modalSrc: '',
    page: 1,
    totalImages: null,
    visibleButton: true,
  };
  async componentDidUpdate(prevProps) {
    if (prevProps.searchName !== this.props.searchName) {
      await this.setState({ status: 'pending', page: 1 });
      fetch(
        `https://pixabay.com/api/?q=${this.props.searchName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          return res.json();
        })
        .then(images => {
          if (images.hits.length !== 0) {
            return this.setState({
              images: images.hits,
              status: 'resolved',
              totalImages: images.totalHits,
            });
          }
          return Promise.reject(
            new Error(`Ничего не найдено по запросу ${this.props.searchName}`)
          );
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalSrc = modalSrc => {
    this.setState({ modalSrc });
  };

  loadMore = async () => {
    await this.setState(prevState => ({
      page: prevState.page + 1,
      visibleButton: false,
    }));
    await fetch(
      `https://pixabay.com/api/?q=${this.props.searchName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        return res.json();
      })
      .then(images => {
        if (images.hits.length !== 0) {
          return this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
            visibleButton: true,
          }));
        }
        return Promise.reject(
          new Error(`Ничего не найдено по запросу ${this.props.searchName}`)
        );
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });

    const { height: cardHeight } = document
      .querySelector('ul')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2.3,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, error, showModal, modalSrc } = this.state;
    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return (
        <div className={s.container}>
          <BallTriangle color="#3f51b5" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <span>{error.message}</span>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.gallery}>
            {this.state.images.map(article => {
              return (
                <ImageGalleryItem
                  onClick={this.toggleModal}
                  modalSrc={this.handleModalSrc}
                  key={article.id}
                  src={article.webformatURL}
                  alt={article.tags}
                  originImage={article.largeImageURL}
                />
              );
            })}
          </ul>
          {!this.state.visibleButton && (
            <div className={s.container}>
              <BallTriangle color="#3f51b5" height={60} width={60} />
            </div>
          )}
          {this.state.totalImages > this.state.images.length &&
            this.state.visibleButton && (
              <div className={s.container}>
                <Button onClick={this.loadMore} />
              </div>
            )}
          {showModal && (
            <Modal onClick={this.toggleModal} modalSrc={modalSrc} />
          )}
        </>
      );
    }
  }
}
