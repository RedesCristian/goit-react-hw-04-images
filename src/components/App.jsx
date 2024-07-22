import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Searchbar from './SearchBar';

const API_KEY = '43883477-d1f56fd35c1c851aa1589f515';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [images, setimages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState('false');
  const [showModal, setShowModal] = useState('false');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar />
    </div>
  );
};
