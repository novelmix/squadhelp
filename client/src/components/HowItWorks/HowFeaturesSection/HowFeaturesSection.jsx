import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowFeaturesSection.module.sass';

const HowFeaturesSection = () => {
  return (
    <>
      <hr />
      <section className={styles.featuresSection}>
        <img
          className={styles.featuresImage}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/features-image1.svg`}
          alt="features-image"
        />
        <h2 className={styles.featuresTitle}>How Do Naming Contests Work?</h2>
        <div className={styles.featuresItems}>
          <img
            className={styles.featuresImage}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/features-image2.svg`}
            alt="features-image"
          />
          <ul className={styles.featuresList}>
            <li className={styles.featuresListItem}>
              <span>1.</span>
              Fill out your Naming Brief and begin receiving name ideas in
              minutes
            </li>
            <li className={styles.featuresListItem}>
              <span>2.</span>
              Rate the submissions and provide feedback to creatives. Creatives
              submit even more names based on your feedback.
            </li>
            <li className={styles.featuresListItem}>
              <span>3.</span>
              Our team helps you test your favorite names with your target
              audience. We also assist with Trademark screening.
            </li>
            <li className={styles.featuresListItem}>
              <span>4.</span>
              Pick a Winner. The winner gets paid for their submission.
            </li>
          </ul>
        </div>
      </section>
      <hr />
    </>
  );
};

export default HowFeaturesSection;
