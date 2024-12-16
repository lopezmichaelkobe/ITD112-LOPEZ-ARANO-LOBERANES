import React from 'react';
import img from './assets/img/images.png'; // Import the image
import banner2 from './assets/img/banner2.png'; // Import another image
import './banner.css';

function Banner() {
  return (
    <div className="row banner-container">
      <div className="col-lg-14">
        <img src={img} alt="Description of the first image" className="banner-image" />
      </div>
    </div>
  );
}

export default Banner;
