import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className='content-wrapper'>
      <div className='not-found-body'>
        <div class="not-found-container">
          <div class="astronaut"></div>
          <h1>404 - Lost in Space</h1>
          <p>Oops! We couldn't find the page you're looking for. Our friendly alien friends might be able to help you find your way back.</p>
          <Link to="/" class="home-link">Beam me back home!</Link>
          <div class="ufo"></div>
        </div>
      </div>
    </div>

  );
};

export default PageNotFound;
