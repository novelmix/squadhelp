import React from 'react';
import styles from './HowServiceSection.module.sass';
import CONSTANTS from '../../../constants';
import { Link } from 'react-router-dom';

const HowServiceSection = () => {
  const items = CONSTANTS.HOW_SERVICE_ITEM;
  return (
    <section className={styles.serviceSection}>
      <article>
        <span className={styles.serviceTag}></span>
        <h2 className={styles.serviceTitle}>3 Ways To Use Squadhelp</h2>
        <p className={styles.serviceText}>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </article>
      <div className={styles.serviceContainerItems}>
        {items.map(({ title, text, image, btnText }, index) => (
          <article key={index}>
            <img
              className={styles.serviceImage}
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/${image}`}
              alt={image}
            />
            <h3 className={styles.serviceTitle}>{title}</h3>
            <p className={styles.serviceText}>{text}</p>
            <Link to="/startContest">
              {/* can links to items */}
              <button className={styles.serviceBtn}>{btnText}</button>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowServiceSection;
