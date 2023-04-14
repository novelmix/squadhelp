import React from 'react';
import { connect } from 'react-redux';
import { deleteEvent } from '../../store/slices/eventsSlice.js';
import { useCountdown } from '../../hooks/useCountdown.js';
import { toUpperFirstLFirstLetter } from '../../utils/functions.js';
import styles from './Event.module.sass';
import EventProgressBar from './EventProgressBar/EventProgressBar';

const Event = (props) => {
  const {
    event: { name, createdAt, endedAt },
    deleteEvent,
  } = props;

  const [year, days, hours, minutes, seconds] = useCountdown(endedAt);

  const progress =
    ((Date.now() - createdAt) / (Date.parse(endedAt) - createdAt)) * 100;

  return (
    <>
      <div className={styles.eventContainer}>
        <div className={styles.eventItem}>
          <div className={styles.eventProgressBar}>
            <EventProgressBar
              bgcolor={progress >= 100 || progress < 0 ? '#ea9797' : '#d1e9cf'}
              completed={progress >= 100 ? 100 : progress}
            />
          </div>
          <article>
            <h3>{toUpperFirstLFirstLetter(name)}</h3>
            <p>
              <span>{year == 0 ? null : `${year} y `}</span>
              <span>{days == 0 ? null : `${days} d `}</span>
              <span>{hours == 0 ? null : `${hours} h `}</span>
              <span>{minutes == 0 ? null : `${minutes} m `}</span>
              <span>{seconds == 0 ? null : `${seconds} s `}</span>
            </p>
          </article>
          <a onClick={() => deleteEvent(createdAt)}>
            <i className="fas fa-trash"></i>
          </a>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  deleteEvent,
};

export default connect(null, mapDispatchToProps)(Event);
