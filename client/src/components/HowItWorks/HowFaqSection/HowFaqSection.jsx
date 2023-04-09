import React from 'react';
import styles from './HowFaqSection.module.sass';
import AccordionList from './AccordionList/AccordionList';
import CONSTANTS from '../../../constants.js';

const HowFaqSection = () => {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <nav className={styles.faqNav}>
          <ul className={styles.faqList}>
            <li className={styles.faqListItem}>
              <a className={styles.faqItemLink} href="#contests">
                Launching A Contest
              </a>
            </li>
            <li className={styles.faqListItem}>
              <a className={styles.faqItemLink} href="#marketplace">
                Buying From Marketplace
              </a>
            </li>
            <li className={styles.faqListItem}>
              <a className={styles.faqItemLink} href="#managed">
                Managed Contests
              </a>
            </li>
            <li className={styles.faqListItem}>
              <a className={styles.faqItemLink} href="#creatives">
                For Creatives
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.faqListContainer}>
          <AccordionList data={CONSTANTS.HOW_FAQ_ITEMS[0]} />
          <AccordionList data={CONSTANTS.HOW_FAQ_ITEMS[1]} />
          <AccordionList data={CONSTANTS.HOW_FAQ_ITEMS[2]} />
          <AccordionList data={CONSTANTS.HOW_FAQ_ITEMS[3]} />
        </div>
      </div>
    </section>
  );
};

export default HowFaqSection;
