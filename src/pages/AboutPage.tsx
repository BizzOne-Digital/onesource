import { PageMeta } from '@/components/PageMeta';
import { PageHero } from '@/components/PageHero';
import { EstimateButton, CallNowButton } from '@/components/Buttons';
import { Reveal, StaggerReveal, StaggerItem } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';
import styles from './AboutPage.module.css';

const values = [
  {
    title: 'Quality workmanship',
    text: 'Proper prep, careful application, and clean finishes on every job — because details define professional results.',
  },
  {
    title: 'Reliability',
    text: 'Clear scheduling and steady communication so you know what to expect from estimate through completion.',
  },
  {
    title: 'Customer service',
    text: 'A straightforward experience for homeowners, landlords, investors, and property managers alike.',
  },
  {
    title: 'Stress-free process',
    text: 'We keep projects organized so refreshing a room or transforming a property feels simple.',
  },
];

const audienceItems = [
  'Homeowners updating a single room or whole home',
  'Landlords preparing units between tenants',
  'Real estate investors refreshing curb appeal',
  'Property managers coordinating reliable vendors',
];

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us"
        description={`Learn about ${siteConfig.businessName} — ${siteConfig.experienceLabel} delivering interior and exterior painting and home services across Central Florida.`}
      />

      <PageHero
        line1="About"
        line2Accent="One Source 360"
        line3="Service Made Simple"
        subtext={`${siteConfig.experienceLabel} serving homeowners and property professionals across Central Florida.`}
        compact
        plain
        centered
      />

      <section className={`section ${styles.intro}`}>
        <div className={`container ${styles.introGrid}`}>
          <Reveal className={styles.introCol}>
            <p className="section-label">Who we are</p>
            <h2 className="section-title">Built on craftsmanship &amp; clear communication</h2>
            <p className={styles.body}>{siteConfig.aboutParagraph}</p>
          </Reveal>
          <Reveal className={styles.introCol} delay={0.1}>
            <div className={styles.experienceCard}>
              <span className={styles.experienceNum}>10+</span>
              <span className={styles.experienceLabel}>Years of experience</span>
              <p className={styles.experienceText}>
                Focused on quality workmanship, clean finishes, and a stress-free customer
                experience on every project.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <Reveal className={styles.storyCol}>
              <p className="section-label">Our story</p>
              <h2 className="section-title">Making professional home services approachable</h2>
              <p className={styles.body}>
                One Source 360 LLC was founded to make professional home services approachable for
                Central Florida property owners. Painting is at the heart of what we do — interior
                and exterior — with complementary services that help you prepare, maintain, and
                present your property with confidence.
              </p>
              <p className={styles.body}>
                Over more than a decade, we have focused on consistent quality: surfaces prepared
                the right way, lines that stay crisp, and finishes that look great in real-world
                Florida conditions.
              </p>
            </Reveal>
            <Reveal className={styles.storyCol} direction="left" delay={0.1}>
              <blockquote className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <p>{siteConfig.slogan}</p>
                <footer>— {siteConfig.businessName}</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.values}`}>
        <div className="container">
          <Reveal>
            <p className="section-label">Values</p>
            <h2 className="section-title">What you can expect on every project</h2>
          </Reveal>
          <StaggerReveal className={styles.valueGrid}>
            {values.map((v) => (
              <StaggerItem key={v.title} className={styles.valueGridItem}>
                <article className={styles.valueCard}>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className={`section ${styles.audience}`}>
        <div className={`container ${styles.audienceGrid}`}>
          <Reveal className={styles.audienceCol}>
            <p className="section-label">Who we serve</p>
            <h2 className="section-title">Residential &amp; commercial clients</h2>
            <ul className={styles.audienceList}>
              {audienceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className={styles.audienceCol} direction="left">
            <div className={styles.audienceVisual}>
              <img
                src="/hero/inset-interior.jpg"
                alt="Bright residential interior after professional updates"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.cta}`} aria-labelledby="about-cta-heading">
        <div className="container">
          <Reveal>
            <div className={styles.ctaBox}>
              <span className={styles.ctaAccent} aria-hidden="true" />
              <h2 id="about-cta-heading">Get a clear, free estimate</h2>
              <p>
                Share your project scope and property location — we will follow up with next steps.
                Prefer to talk now?{' '}
                <a href={siteConfig.phoneTel} className={styles.ctaPhone}>
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <div className={styles.ctaButtons}>
                <EstimateButton size="lg" showArrow uppercase className={styles.ctaBtn} />
                <CallNowButton
                  size="lg"
                  uppercase
                  className={`${styles.ctaBtn} ${styles.ctaCallBtn}`}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
