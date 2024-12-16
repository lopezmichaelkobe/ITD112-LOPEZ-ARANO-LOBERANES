import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./Carousel.css";

const Carousel = ({ data = [] }) => {
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlide((prevSlide) => (prevSlide === data.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlide((prevSlide) => (prevSlide === 0 ? data.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [slide]);

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {Array.isArray(data) &&
        data.map((item, idx) => (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={`slide ${slide === idx ? "slide-active" : ""} ${isTransitioning ? "slide-transition" : ""}`}
          />
        ))}
      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      <span className="indicators">
        {Array.isArray(data) &&
          data.map((_, idx) => (
            <button
              key={idx}
              className={slide === idx ? "indicator" : "indicator indicator-inactive"}
              onClick={() => setSlide(idx)}
            ></button>
          ))}
      </span>
    </div>
  );
};

export default Carousel;
