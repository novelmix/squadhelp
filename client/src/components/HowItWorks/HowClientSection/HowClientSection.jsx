import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowClientSection.module.sass';

const HowClientSection = () => {
  return (
    <section className={styles.clientSection}>
      <div className={styles.clientContainer}>
        <h6>Featured In</h6>
        <div className={styles.greyContainer}>
          <hr />
          <div className={styles.adv}>
            <div className={styles.images} title="FORVES">
              <a
                href="https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199/?sh=5d4bb0a26145"
                target="_blank"
              >
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
                  alt="forbes"
                />
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-active.png`}
                  alt="forbes"
                />
              </a>
            </div>
            <div className={styles.images} title="THE NEXT WEB">
              <a
                href="https://thenextweb.com/news/crowdsource-startup-name-with-squadhelp"
                target="_blank"
              >
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
                  alt="web"
                />
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_active.png`}
                  alt="web"
                />
              </a>
            </div>
            <div className={styles.images} title="MASHABLE">
              <a
                href="https://mashable.com/archive/make-money-crowdworking"
                target="_blank"
              >
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
                  alt="mashable"
                />
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-active.png`}
                  alt="mashable"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowClientSection;
