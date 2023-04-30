import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import styles from './SubHeader.module.sass';

const SubHeader = (props) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="#">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <a href="tel:877355-3585">(877)&nbsp;355-3585</a>
        </div>
        <div className={styles.userButtonsContainer}>
          {props.data ? (
            <>
              <div className={styles.userInfo}>
                <img
                  src={
                    props.data.avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : `${CONSTANTS.publicURL}${props.data.avatar}`
                  }
                  alt="user"
                />
                <span className={styles.userDN}>{`Hi, ${props.data.displayName}`}</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/dashboard">
                      <span>View Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/account">
                      <span>My Account</span>
                    </Link>
                  </li>
                  {props.data.role !== 'customer' ? null : (
                    <li>
                      <Link to="/events">
                        <span>Events</span>
                        {props.events && (
                          <span className={styles.eventCount}>
                            {props.countEvents(props.events) || null}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}
                  <li>
                    {props.data && props.data.role !== CONSTANTS.MODERATOR && (
                      <Link to="#">
                        <span>Messages</span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {props.data && props.data.role !== CONSTANTS.MODERATOR && (
                      <Link to="#">
                        <span>Affiliate Dashboard</span>
                      </Link>
                    )}
                  </li>
                  <li>
                    <span onClick={props.logOut}>Logout</span>
                  </li>
                </ul>
              </div>
              {/* <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
                className={styles.emailIcon}
                alt="email"
              /> */}
            </>
          ) : (
            <>
              <Link to="/login">
                <span className={styles.btn}>Login</span>
              </Link>
              <Link to="/registration">
                <span className={styles.btn}>Signup</span>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Link to="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            className={styles.logo}
            alt="blue_logo"
          />
        </Link>
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>Name Ideas</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Beauty</a>
                  </li>
                  <li>
                    <a href="#">Consulting</a>
                  </li>
                  <li>
                    <a href="#">E-Commerce</a>
                  </li>
                  <li>
                    <a href="#">Fashion & Clothing</a>
                  </li>
                  <li>
                    <a href="#">Finance</a>
                  </li>
                  <li>
                    <a href="#">Real Estate</a>
                  </li>
                  <li>
                    <a href="#">Tech</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Contests</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <Link to="/how-it-works">How It Works</Link>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">Agency Service</a>
                  </li>
                  <li>
                    <a href="#">Active Contests</a>
                  </li>
                  <li>
                    <a href="#">Winners</a>
                  </li>
                  <li>
                    <a href="#">Leaderboard</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Become A Creative</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Names</a>
                  </li>
                  <li>
                    <a href="#">Taglines</a>
                  </li>
                  <li>
                    <a href="#">Logos</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Testimonials</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Popular Names</a>
                  </li>
                  <li>
                    <a href="#">Short Names</a>
                  </li>
                  <li>
                    <a href="#">Intriguing Names</a>
                  </li>
                  <li>
                    <a href="#">Names By Category</a>
                  </li>
                  <li>
                    <a href="#">Visual Name Search</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">Sell Your Domains</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  <li>
                    <a href="#">Ultimate Naming Guide</a>
                  </li>
                  <li>
                    <a href="#">Poetic Devices In Business Naming</a>
                  </li>
                  <li>
                    <a href="#">Crowded Bar Theory</a>
                  </li>
                  <li className={styles.last}>
                    <a href="#">All Articles</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {props.data && props.data.role === CONSTANTS.CUSTOMER && (
            <div
              className={styles.startContestBtn}
              onClick={props.startContests}
            >
              Start Contest
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
