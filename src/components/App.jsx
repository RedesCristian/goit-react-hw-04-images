import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import CustomLoader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './Modal.module.css';

const API_KEY = '43883477-d1f56fd35c1c851aa1589f515';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          page: page,
          per_page: 12,
          image_type: 'photo',
        },
      });
      setImages(prevImages => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query) {
      fetchImages();
    }
  }, [query, page, fetchImages]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (image = null) => {
    setShowModal(prevShowModal => !prevShowModal);
    setSelectedImage(image);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={toggleModal} />
      {loading && <CustomLoader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={selectedImage} onClose={toggleModal} />}
    </div>
  );
};

export { App };
