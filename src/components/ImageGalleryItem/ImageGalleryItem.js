import React from 'react';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onClick, modalSrc, src, alt, originImage }) => {
  return (
    <li
      onClick={() => {
        modalSrc(originImage);
        onClick();
      }}
      className={s.galleryItem}
    >
      <img className={s.image} src={src} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
