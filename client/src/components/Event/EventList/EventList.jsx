import React from 'react';
import { connect } from 'react-redux';
import Event from '../Event';
import styles from './EventList.module.sass';

const EventList = ({ events }) => {
  return (
    <div className={styles.eventListContainer}>
      <div className={styles.eventListHeader}>
        <h2>Live upcomming checks</h2>
        <span>
          Remaining time <i className="fas fa-clock fa-spin"></i>
        </span>
      </div>
      <hr />
      {events
        ? events.map((e) => <Event key={e.createdAt} event={e} />)
        : null}
    </div>
  );
};

const mapStateToProps = (state) => state.eventsStore;

export default connect(mapStateToProps, null)(EventList);
