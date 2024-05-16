// index.tsx

import React, { useState, useEffect } from 'react';
import ImageCard from '../utils/ImageCard';
import Pagination from '../utils/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera , faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export async function getServerSideProps(context) {
  const { query, page } = context.query;
  let data = null;
  if (query && page) {
    const response = await fetch(`https://simple-pexels-proxy.onrender.com/search?query=${query}&per_page=12&page=${page}`);
    data = await response.json();
  }
  return {
    props: {
      imageData: data
    }
  };
}

function App(props) {
  const { imageData } = props;

  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    if (imageData) {
      setTotalResults(imageData.total_results);
      setError('');
    } else {
      console.error("Failed to fetch images:");
      setError('Failed to fetch images. Please try again.');
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParam = urlParams.get('query');
    const pageParam = urlParams.get('page');
    if (queryParam) {
      setQuery(queryParam);
    }
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    }
  }, [imageData]);

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get('query');
    setQuery(searchQuery);
    setCurrentPage(1); // Reset page to 1 on new search
    window.location = `?query=${searchQuery}&page=1`;
  };

  const _onPageChange = (num) => {
    setCurrentPage(num);
    window.location = `?query=${query}&page=${num}`;
  };

  const _onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.location = `?query=${query}&page=${currentPage + 1}`;
    }
  };
  const totalPages = Math.ceil(totalResults / 12);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">My Image Search</div>
        <div className="navbar-buttons">
        <button className='cart-nav'> <FontAwesomeIcon icon={faHeart} /> Lightboxes</button>
          <button className='cart-nav'> <FontAwesomeIcon icon={faShoppingCart} /> Cart</button>
          <button>Sign In</button>
        </div>
      </nav>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="filter-dropdown">
            <select value={query} onChange={_onChange}>
              <option value="All Images">All Images</option>
              <option value="Recent">Recent</option>
              <option value="Popular">Popular</option>
            </select>
          </div>
          <div className="search-input">
            {/* <input type="text" name="query" onChange={_onChange} placeholder="Search images..." />
             */}
             <input type="text" name="query" value={query} onChange={_onChange} placeholder="Search images..." />

          </div>
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faCamera} /> Search by Image
          </button>
        </form>
      </div>
      
      <div className="banner">
        <button className="banner-button">All</button>
        <button className="banner-button">Creative</button>
        <button className="banner-button">Editorial</button>
      </div>
      <div className="search-info-container">
        <div className="search-info">
          <b>{query} Stock photos and Images({totalResults})</b>
        </div>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(totalResults / 12)} onPageChange={_onPageChange} />
      </div>
      <div className="container">
        {error && <p className="error">{error}</p>}
        {imageData?.photos.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
      <div className="next-page-button">
        <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next Page</button>
      </div>
      <div className="search-info-container2">
        <div className="search-info">
          <b>Search Results for {query} Stock photos and Images({totalResults})</b>
        </div>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(totalResults / 12)} onPageChange={_onPageChange} />
      </div><footer className="footer">
        <div className="footer-section1">
          366,681,625 stock photos, 360° panoramic images, vectors and videos
        </div>
        <div className="footer-section2">
          <p>My Image Search</p>
          <p>changing the world one image at a time</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
