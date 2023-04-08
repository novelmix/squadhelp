import React, { useState } from 'react';
import CONSTANTS from '../../../constants';
import styles from './HowDoesSection.module.sass';

const HowDoesSection = () => {
  const [isActive, setIsActive] = useState(false);

  const videoHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <section className={styles.howDoesSection}>
      <div className={styles.howDoesMainContainer}>
        <div className={styles.howDoesContainer}>
          <span className={styles.howDoesTag}></span>
          <article>
            <h1 className={styles.howDoesTitle}>How Does Squadhelp Work?</h1>
            <p className={styles.howDoesText}>
              Squadhelp helps you come up with a great name for your business by
              combining the power of crowdsourcing with sophisticated technology
              and Agency-level validation services.
            </p>
          </article>
          {isActive && (
            <div className={styles.frameContent} onClick={videoHandler}>
              <iframe
                className={styles.frame}
                allowFullScreen
                src="//player.vimeo.com/video/368584367?autoplay=1&amp;hd=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;fullscreen=1&amp;api=1"
              ></iframe>
            </div>
          )}
          <button className={styles.howDoesBtn} onClick={videoHandler}>
            Play Video
          </button>
        </div>
        <img
          className={styles.howDoesImg}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorks/how-does.svg`}
          alt="how does"
        />
      </div>
    </section>
  );
};

export default HowDoesSection;
