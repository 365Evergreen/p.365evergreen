import  { useState, useEffect } from 'react';
import styles from './HeroSlideShow.module.css';

const slideData = [
  {
    image: 'https://cdn.365evergreen.com/content/media/modern-workplace.webp',
    title: 'Creating the modern workplace',
    subtitle: 'We partner with organisations to transform their work with modern tools.',
    ctaText: 'Start Journey',
    ctaLink: '#journey'
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-automate.webp',
    title: 'Automating the boring stuff',
    subtitle: 'We help businesses streamline processes and improve efficiency with automation.',
    ctaText: 'Find Peace',
    ctaLink: '#peace'
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-apps.webp',
    title: 'Building with Power Apps',
    subtitle: 'We help organisations build custom solutions with Power Apps.',
    ctaText: 'Learn More',
    ctaLink: '#about'
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-bi.webp',
    title: 'Making sense of data',
    subtitle: 'We help organisations make data-driven decisions with Power BI.',
    ctaText: 'Explore Insights',
    ctaLink: '#insights'
  },{
    image: 'https://cdn.365evergreen.com/content/media/security.webp',
    title: 'Securing your business',
    subtitle: 'We help organisations protect their data and comply with regulations.',
    ctaText: 'Get Protected',
    ctaLink: '#security'
  }
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.slideshowContainer}>
      {/* Slides Container */}
      {slideData.map((slide, index) => {
        // Construct conditional classes using string interpolation
        const isCurrent = index === currentIndex;
        const slideClassName = `${styles.slide} ${isCurrent ? styles.slideActive : ''}`;

        return (
          <div key={index} className={slideClassName}>
            <img
              src={slide.image}
              alt={slide.title}
              className={styles.image}
            />
            <div className={styles.overlay} />
            
            <div className={styles.content}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <a href={slide.ctaLink} className={styles.ctaButton}>
                {slide.ctaText}
              </a>
            </div>
          </div>
        );
      })}

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className={`${styles.arrowButton} ${styles.leftArrow}`}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className={`${styles.arrowButton} ${styles.rightArrow}`}
      >
        &#10095;
      </button>

      {/* Bottom Dot Indicators */}
      <div className={styles.dotContainer}>
        {slideData.map((_, index) => {
          const isCurrent = index === currentIndex;
          const dotClassName = `${styles.dot} ${isCurrent ? styles.dotActive : ''}`;

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={dotClassName}
            />
          );
        })}
      </div>
    </div>
  );
}
