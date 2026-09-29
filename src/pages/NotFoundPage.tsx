import { Link } from 'react-router-dom';
import { PageMeta } from '@/components/PageMeta';
import { EstimateButton } from '@/components/Buttons';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Page Not Found"
        description="The page you requested could not be found. Return to One Source 360 LLC for home services and free estimates in Central Florida."
      />
      <section className={styles.wrap}>
        <div className="container">
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This page isn&apos;t on the map</h1>
          <p className={styles.text}>
            The link may be outdated or mistyped. Head back home or request a free estimate for
            your next project.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.homeLink}>
              Back to home
            </Link>
            <EstimateButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
