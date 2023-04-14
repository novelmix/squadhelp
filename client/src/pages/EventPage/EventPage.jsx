import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import EventFormTime from '../../components/Event/EventFormTime/EventFormTime';
import EventList from '../../components/Event/EventList/EventList';
import styles from './EventPage.module.sass';

const EventPage = (props) => {
  const {
    data: { role },
    history,
  } = props;
  return (
    <>
      <Header />
      {role !== 'customer' ? (
        history.replace('./')
      ) : (
        <section className={styles.eventSection}>
          <EventFormTime />
          <EventList />
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(EventPage);
