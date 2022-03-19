import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ articles, onClick }) {
  return (
    <ul className={s.gallery}>
      {articles.map(article => {
        return (
          <ImageGalleryItem
            onClick={onClick}
            key={article.id}
            src={article.webformatURL}
            alt={article.tags}
            originImage={article.largeImageURL}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};
