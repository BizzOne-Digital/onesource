import { PageMeta } from '@/components/PageMeta';
import { EstimateButton } from '@/components/Buttons';
import { Reveal } from '@/components/motion/Reveal';
import { contactEstimateHref, services, siteConfig } from '@/config/site';
import { Link } from 'react-router-dom';
import styles from './ServicesPage.module.css';

export function ServicesPage() {
  const painting = services.filter((s) => s.featured);
  const additional = services.filter((s) => !s.featured);

  return (
    <>
      <PageMeta
        title="Services"
        description="Interior and exterior painting, epoxy flooring, pressure washing, house cleaning, junk removal, handyman services, and residential & commercial work in Central Florida. Free estimates."
      />

      <header className={styles.pageHeader}>
        <div className="container">
          <Reveal>
            <div className={styles.pageHeaderInner}>
              <p className="section-label">Services</p>
              <h1 className={styles.title}>Everything your property needs — starting with paint</h1>
              <p className={styles.intro}>
                Interior and exterior painting are our core specialties. Explore additional services
                that pair perfectly with refreshes, turnovers, and commercial upkeep across{' '}
                {siteConfig.serviceAreas.slice(0, 3).join(', ')}, and beyond.
              </p>
              <EstimateButton size="lg" />
            </div>
          </Reveal>
        </div>
      </header>

      <section className={styles.paintingSection} aria-labelledby="painting-heading">
        <div className="container">
          <Reveal>
            <h2 id="painting-heading" className={styles.sectionHeading}>
              Primary painting services
            </h2>
          </Reveal>
          {painting.map((service, index) => (
            <article
              key={service.slug}
              className={`${styles.serviceRow} ${index % 2 === 1 ? styles.reversed : ''}`}
            >
              <Reveal direction={index % 2 === 0 ? 'right' : 'left'}>
                <div className={styles.serviceMedia}>
                  <img src={service.image} alt={service.imageAlt} loading="lazy" />
                </div>
              </Reveal>
              <Reveal direction={index % 2 === 0 ? 'left' : 'right'} delay={0.08}>
                <div className={styles.serviceContent}>
                  <span className={styles.serviceIndex}>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={contactEstimateHref()} className={styles.serviceCta}>
                    Request a free estimate
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className={`section ${styles.additional}`} aria-labelledby="additional-heading">
        <div className="container">
          <Reveal>
            <h2 id="additional-heading" className="section-title">
              Additional home services
            </h2>
            <p className="section-lead">
              Combine painting with prep and maintenance services for a smoother project from start
              to finish.
            </p>
          </Reveal>
          <div className={styles.cardGrid}>
            {additional.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05} className={styles.cardGridItem}>
                <article className={styles.serviceCard}>
                  <div className={styles.cardImage}>
                    <img src={service.image} alt={service.imageAlt} loading="lazy" />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{service.title}</h3>
                    <p className={styles.cardSummary}>{service.shortDescription}</p>
                    <p className={styles.cardDetail}>{service.description}</p>
                    <Link to={contactEstimateHref()} className={styles.serviceCta}>
                      Get estimate
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.banner}>
        <div className="container">
          <Reveal>
            <div className={styles.bannerInner}>
              <h2>Pricing is tailored to your project</h2>
              <p>
                We do not publish flat rates online. Every property is different — request a free
                estimate and we will outline scope and next steps with you.
              </p>
              <EstimateButton size="lg" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
