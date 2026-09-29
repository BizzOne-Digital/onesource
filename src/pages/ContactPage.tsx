import { PageMeta } from '@/components/PageMeta';
import { CallNowButton, EstimateButton } from '@/components/Buttons';
import { EstimateForm } from '@/components/EstimateForm';
import { Reveal } from '@/components/motion/Reveal';
import { siteConfig } from '@/config/site';
import styles from './ContactPage.module.css';

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact & Free Estimate"
        description={`Contact ${siteConfig.businessName} at ${siteConfig.phoneDisplay}. Request a free estimate for painting and home services in Lake Wales, Winter Haven, Lakeland, and Central Florida.`}
      />

      <section className={styles.top}>
        <div className={`container ${styles.topGrid}`}>
          <Reveal>
            <p className="section-label">Contact</p>
            <h1 className={styles.title}>Free estimates & fast answers</h1>
            <p className={styles.lead}>
              Call now or send your project details — we serve homeowners, landlords, investors,
              and property managers throughout Central Florida.
            </p>
            <a href={siteConfig.phoneTel} className={styles.phone}>
              {siteConfig.phoneDisplay}
            </a>
            <p className={styles.hours}>{siteConfig.hours}</p>
            <div className={styles.quickCtas}>
              <CallNowButton size="lg" />
              <EstimateButton size="lg" />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className={styles.infoCard}>
              <h2>Service areas</h2>
              <ul>
                {siteConfig.serviceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
              <p className={styles.estimateNote}>
                Every project starts with a complimentary estimate — no published pricing online.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.formSection}`} aria-labelledby="form-heading">
        <div className="container">
          <Reveal>
            <h2 id="form-heading" className="section-title">
              Request your free estimate
            </h2>
            <p className="section-lead">
              Complete the form below and we will follow up using your preferred contact method.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div id={siteConfig.contactFormAnchor} className={styles.formWrap}>
              <EstimateForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
