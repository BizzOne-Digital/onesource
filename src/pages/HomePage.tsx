import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PageMeta } from '@/components/PageMeta';
import { CallNowButton, EstimateButton } from '@/components/Buttons';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal';
import { galleryImages, services, siteConfig } from '@/config/site';
import { usePrefersReducedMotion, useMediaQuery } from '@/hooks/useMedia';
import styles from './HomePage.module.css';

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery('(max-width: 767px)');
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || narrow ? [0, 0] : [0, 80],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced || narrow ? [1, 1] : [1, 1.06],
  );

  const featured = services.filter((s) => s.featured);
  const otherServices = services.filter((s) => !s.featured).slice(0, 4);

  return (
    <>
      <PageMeta
        title="Central Florida Home Services"
        description={`${siteConfig.businessName} — ${siteConfig.headline}. Free estimates for painting and home services in Lake Wales, Winter Haven, Lakeland, Davenport, Haines City and Central Florida.`}
      />

      <section ref={heroRef} className={styles.hero} aria-labelledby="hero-heading">
        <motion.div
          className={styles.heroBg}
          style={{ y: imageY, scale: imageScale }}
          role="img"
          aria-label="Modern home exterior at dusk"
        />
        <div className={styles.heroShade} aria-hidden="true" />

        <div className={`container-wide ${styles.heroContent}`}>
          <motion.div
            className={styles.heroCopy}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              id="hero-heading"
              className={styles.heroTitle}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              <span className={styles.titleLine}>Professional</span>
              <span className={styles.titleAccent}>Home Services</span>
              <span className={styles.titleLine}>Made Simple</span>
            </motion.h1>
            <motion.div
              className={styles.subBlock}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
            >
              <span className={styles.subLine} aria-hidden="true" />
              <p className={styles.heroSub}>Painting and property services across Central Florida</p>
            </motion.div>
            <motion.div
              className={styles.heroCtas}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <EstimateButton size="lg" showArrow uppercase className={styles.heroBtn} />
              <CallNowButton size="lg" uppercase className={`${styles.heroBtn} ${styles.heroCallBtn}`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={`section ${styles.servicesPreview}`}>
        <div className="container">
          <Reveal>
            <p className="section-label">What we do</p>
            <h2 className="section-title">Painting & home services, one trusted team</h2>
            <p className="section-lead">
              From crisp interior lines to weather-ready exteriors, we keep projects organized and
              communication clear — so you get professional results without the stress.
            </p>
          </Reveal>

          <StaggerReveal className={styles.featuredGrid}>
            {featured.map((service) => (
              <StaggerItem key={service.slug}>
                <Link to="/services" className={styles.featuredCard}>
                  <div className={styles.featuredImageWrap}>
                    <img src={service.image} alt={service.imageAlt} loading="lazy" />
                    <span className={styles.featuredTag}>Primary service</span>
                  </div>
                  <div className={styles.featuredBody}>
                    <h3>{service.title}</h3>
                    <p>{service.shortDescription}</p>
                    <span className={styles.cardLink}>Explore services →</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <StaggerReveal className={styles.miniGrid}>
            {otherServices.map((service) => (
              <StaggerItem key={service.slug} className={styles.miniGridItem}>
                <div className={styles.miniCard}>
                  <h3>{service.title}</h3>
                  <p>{service.shortDescription}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <Reveal className={styles.centerCta}>
            <EstimateButton size="lg" />
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.experience}`}>
        <div className={`container ${styles.experienceInner}`}>
          <Reveal direction="right">
            <p className="section-label">Experience</p>
            <h2 className="section-title">{siteConfig.experienceLabel}</h2>
            <p className={styles.experienceText}>{siteConfig.aboutParagraph}</p>
            <CallNowButton />
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className={styles.statPanel}>
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Years serving Central Florida</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>360°</span>
                <span className={styles.statLabel}>Complete home service approach</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Free</span>
                <span className={styles.statLabel}>Estimates for your project</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.gallery}`} aria-labelledby="gallery-heading">
        <div className="container">
          <Reveal>
            <p className="section-label">Project gallery</p>
            <h2 id="gallery-heading" className="section-title">
              Quality finishes & refreshed spaces
            </h2>
            <p className="section-lead">
              A look at the types of professional results we deliver — interior refreshes, exterior
              updates, flooring, and more. Every project starts with a free estimate.
            </p>
          </Reveal>
          <StaggerReveal className={styles.galleryGrid}>
            {galleryImages.map((item) => (
              <StaggerItem key={item.src}>
                <figure className={styles.galleryItem}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className={`section ${styles.area}`}>
        <div className={`container ${styles.areaInner}`}>
          <Reveal className={styles.areaCol}>
            <p className="section-label">Service area</p>
            <h2 className={`section-title ${styles.areaTitle}`}>Proudly serving Central Florida</h2>
            <ul className={styles.areaList}>
              {siteConfig.serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.areaCol} delay={0.15}>
            <div className={styles.areaCard}>
              <div className={styles.areaCardBody}>
                <h3>Homeowners & property professionals</h3>
                <p>
                  Whether you live in the home, manage rentals, or invest in property, we tailor
                  each estimate to your timeline and scope.
                </p>
              </div>
              <div className={styles.areaCardAction}>
                <EstimateButton size="lg" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.finalCta}`} aria-labelledby="final-cta-heading">
        <div className="container">
          <Reveal>
            <div className={styles.finalInner}>
              <span className={styles.finalAccentLine} aria-hidden="true" />
              <h2 id="final-cta-heading" className={styles.finalTitle}>
                Ready for a stress-free estimate?
              </h2>
              <p className={styles.finalText}>
                Tell us about your project or call now —{' '}
                <a href={siteConfig.phoneTel} className={styles.finalPhone}>
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <div className={styles.finalButtons}>
                <EstimateButton size="lg" showArrow uppercase className={styles.finalBtn} />
                <CallNowButton
                  size="lg"
                  uppercase
                  className={`${styles.finalBtn} ${styles.finalCallBtn}`}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
