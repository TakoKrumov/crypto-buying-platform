import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';


const PageNotFound = () => {

  const handleUfoClick = (event) => {
    const ufo = event.currentTarget;
    const ufoRect = ufo.getBoundingClientRect();
    const bubble = document.querySelector('.bubble');
    bubble.innerHTML = "Hey, stop that!";
    bubble.style.display = 'block';
    bubble.style.left = `${ufoRect.left + ufoRect.width / 2 - 75}px`;
    bubble.style.bottom = `${window.innerHeight - ufoRect.top + 10}px`;

    setTimeout(() => {
      bubble.style.display = 'none';
    }, 3000);
  };

  const handleAstronautClick = (event) => {
    const astronaut = event.currentTarget;
    const astronautRect = astronaut.getBoundingClientRect();
    const astronautBubble = document.querySelector('.bubble');
    astronautBubble.innerHTML = "Click the UFO!";
    astronautBubble.style.display = 'block';
    astronautBubble.style.left = `${astronautRect.left + astronautRect.width / 2 - 75}px`;
    astronautBubble.style.bottom = `${window.innerHeight - astronautRect.top + 10}px`;

    setTimeout(() => {
      astronautBubble.style.display = 'none';
    }, 3000);
  };



  return (
    <div className='content-wrapper'>
      <div className='not-found-body main-content'>
        <div class="stars"></div>
        <div class="not-found-container">
          <div className="astronaut" onClick={handleAstronautClick}></div>
          <div className="ufo" onClick={handleUfoClick}></div>
          <div className="bubble"></div>
          <h1 className='notFoundH1'>404 - Lost in Space</h1>
          <p className='notFound'>Oops! We couldn't find the page you're looking for. Our friendly alien friends might be able to help you find your way back.</p>
          <Link to="/" class="home-link">Beam me back home!</Link>

        </div>
      </div>
    </div>

  );
};

export default PageNotFound;
