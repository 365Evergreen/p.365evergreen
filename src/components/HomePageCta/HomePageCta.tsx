import { Link } from 'react-router-dom'
import styles from './HomePageCta.module.css'
import type { HomePageCtaProps } from './HomePageCta.types'

export default function HomePageCta({
  heading,
  supportingText,
  buttonLabel,
  buttonLink,
  onButtonClick,
}: HomePageCtaProps) {
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
