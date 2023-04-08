import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HowPricingSection.module.sass';

const HowPricingSection = () => {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingElInfo}>
        <div className={styles.pricingEl}>
          <span>{`>`}</span>
          <article>
            <h3 className={styles.pricingElInfoTitle}>
              Pay a Fraction of cost vs hiring an agency
            </h3>
            <p className={styles.pricingElInfoText}>
              For as low as $199, our naming contests and marketplace allow you
              to get an amazing brand quickly and affordably.
            </p>
          </article>
        </div>
        <hr />
        <div className={styles.pricingEl}>
          <span>{`>`}</span>
          <article>
            <h3 className={styles.pricingElInfoTitle}>
              Pay a Fraction of cost vs hiring an agency
            </h3>
            <p className={styles.pricingElInfoText}>
              Of course! We have policies in place to ensure that you are
              satisfied with your experience.
              <Link to="/"> Learn more</Link>
            </p>
          </article>
        </div>
      </div>
      <div className={styles.pricingElQues}>
        <article>
          <h3 className={styles.pricingElQuesTitle}>Questions?</h3>
          <p className={styles.pricingElQuesText}>
            Speak with a Squadhelp platform expert to learn more and get your
            questions answered.
          </p>
          <Link to="/">
            <button className={styles.pricingElQuesBtn}>
              Schedule Consultation
            </button>
          </Link>
          <br />
          <br />
          <a className={styles.pricingElTel} href="tel:123-456-7890">
            (877) 355-3585
          </a>
          <br />
          <br />
          <span>Call us for assistance</span>
        </article>
      </div>
    </section>
  );
};

export default HowPricingSection;
