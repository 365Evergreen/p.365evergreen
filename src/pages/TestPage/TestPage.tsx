import SeoHead from '../../components/SeoHead'
import ContentLayout from '../../layouts/ContentLayout'
import styles from './TestPage.module.css'

export default function TestPage() {
  return (
    <ContentLayout title="Test page" description="A temporary test page for routing and navigation checks.">
      <SeoHead
        title="Test page · 365 Evergreen"
        description="This is a temporary test page for route and navigation validation."
      />

      <div className={styles.intro}>
        <p>This page exists only for testing page layout and navigation behavior.</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h2>Dynamic rendering test</h2>
          <p>Use this page to confirm that new pages can be added and rendered without a full redesign.</p>
        </article>
        <article className={styles.card}>
          <h2>Navigation test</h2>
          <p>The new page is linked from the navigation menu and accessible by route.</p>
        </article>
      </div>
    </ContentLayout>
  )
}
