import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowStatsSection.module.sass';

const HowStatsSection = () => {
  const data = CONSTANTS.HOW_STATS_ITEM;
  return (
    <section className={styles.statsSection}>
      {data.map(({ image, text }, index) => (
        <div className={styles.statsContainer} key={index}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/${image}`}
            alt="stats-image"
          />
          <p
            className={styles.statsText}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      ))}
    </section>
  );
};

export default HowStatsSection;
