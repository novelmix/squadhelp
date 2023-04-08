import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import styles from './HowCtaSection.module.sass';

const HowCtaSection = () => {
  return (
    <section className={styles.ctaSection}>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/cta-image1.svg`}
        alt="cta-image"
      />
      <article className={styles.ctaArticle}>
        <h2 className={styles.ctaArticleTitle}>Ready to get started?</h2>
        <p className={styles.ctaArticleText}>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <Link to="/startContest">
          <button className={styles.ctaArticleBtn}>Start A Contest</button>
        </Link>
      </article>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/cta-image2.svg`}
        alt="cta-image"
      />
    </section>
  );
};

export default HowCtaSection;
