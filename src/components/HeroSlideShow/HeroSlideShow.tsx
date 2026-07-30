import { useEffect, useState } from 'react';
import styles from './HeroSlideShow.module.css';

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const slideData: readonly Slide[] = [
  {
    image: 'https://cdn.365evergreen.com/content/media/modern-workplace.webp',
    title: 'Creating the modern workplace',
    subtitle:
      'We partner with organisations to transform their work with modern tools.',
    ctaText: 'Start Journey',
    ctaLink: '#journey',
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-automate.webp',
    title: 'Automating the boring stuff',
    subtitle:
      'We help businesses streamline processes and improve efficiency with automation.',
    ctaText: 'Find Peace',
    ctaLink: '#peace',
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-apps.webp',
    title: 'Building with Power Apps',
    subtitle:
      'We help organisations build custom solutions with Power Apps.',
    ctaText: 'Learn More',
    ctaLink: '#about',
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/power-bi.webp',
    title: 'Making sense of data',
    subtitle:
      'We help organisations make data-driven decisions with Power BI.',
    ctaText: 'Explore Insights',
    ctaLink: '#insights',
  },
  {
    image: 'https://cdn.365evergreen.com/content/media/security.webp',
    title: 'Securing your business',
    subtitle:
      'We help organisations protect their data and comply with regulations.',
    ctaText: 'Get Protected',
    ctaLink: '#security',
  },
];

const AUTO_ROTATE_MS = 5000;

export default function HeroSlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slideData.length - 1 : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slideData.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slideData.length - 1 ? 0 : prev + 1,
      );
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={styles.root}
      aria-roledescription="carousel"
      aria-label="Featured services"
    >
      {slideData.map((slide, index) => {
        const isCurrent = index === currentIndex;

        return (
          <section
            key={slide.title}
            className={`${styles.slide} ${isCurrent ? styles.slideActive : ''
              }`}
          >
            <img
              src={slide.image}
              alt=""
              className={styles.slideImage}
            />

            <div className={styles.slideOverlay} />

            <div className={styles.slideContent}>
              <h1 className={styles.slideTitle}>
                {slide.title}
              </h1>

              <p className={styles.slideSubtitle}>
                {slide.subtitle}
              </p>

              <a
                href={slide.ctaLink}
                className={styles.ctaButton}

                tabIndex={isCurrent ? 0 : -1}
              >
                {slide.ctaText}
              </a>
            </div>
          </section>
        );
      })}

      <button
        type="button"
        className={`${styles.navButton} ${styles.navButtonPrevious}`}
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        &#10094;
      </button>

      <button
        type="button"
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &#10095;
      </button>

      <div className={styles.pagination}>
        {slideData.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            className={`${styles.paginationDot} ${index === currentIndex
                ? styles.paginationDotActive
                : ''
              }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}