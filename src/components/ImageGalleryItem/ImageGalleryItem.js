import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onClick, src, alt, originImage }) => {
  return (
    <li onClick={() => onClick(originImage)} className={s.galleryItem}>
      <img className={s.image} src={src} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  originImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
