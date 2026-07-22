import styles from './SiteFooter.module.css'
import appConfig from '../../config/appConfig'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Helping organisations keep Microsoft 365 evergreen.</p>
        <p className={styles.meta}>Environment: {appConfig.environment}</p>
      </div>
    </footer>
  )
}
