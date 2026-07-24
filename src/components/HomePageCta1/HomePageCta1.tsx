import { Link } from 'react-router-dom'
import styles from './HomePageCta1.module.css'
import type { HomePageCta1Props } from './HomePageCta1.types'

export default function HomePageCta1({
  heading,
  supportingText,
  buttonLabel,
  buttonLink,
  onButtonClick,
}: HomePageCta1Props) {
  return (
    <section className={styles.section} aria-labelledby="homepage-cta-heading">
      <div className={styles.content}>
        <h2 id="homepage-cta-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.supportingText}>{supportingText}</p>
      </div>
      {onButtonClick ? (
        <button type="button" className={styles.button} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      ) : (
        <Link to={buttonLink ?? '/'} className={styles.button}>
          {buttonLabel}
        </Link>
      )}
    </section>
  )
}
