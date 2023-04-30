import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../../store/slices/eventsSlice.js';
import { Formik, Field, Form } from 'formik';
import { getDateToday } from '../../../utils/functions.js';
import styles from './EventFormTime.module.sass';

const EventFormTime = (props) => {
  const submitHandler = (values, {resetForm}) => {
    const { name, endDate, endTime, notificationTime } = values;
    const newEvent = {
      name,
      createdAt: Date.now(),
      endedAt: `${endDate} ${endTime}`,
      notificationTime: `${endDate} ${notificationTime}`,
    };
    props.addEvent(newEvent);
    resetForm();
  };

  const today = getDateToday(new Date());
  return (
    <>
      <div className={styles.eventFormTime}>
        <h3 className={styles.headerFormTime}>Create new event</h3>
        <hr />
        <Formik
          initialValues={{
            name: '',
            endDate: '',
            endTime: '',
            notificationTime: '',
          }}
          onSubmit={submitHandler}
        >
          <Form className={styles.eventForm}>
            <Field type="text" name="name" title="name event" placeholder="Name event" required />
            <h4>Select the end date of the event</h4>
            <Field
              type="time"
              name="endTime"
              title="end time of the event"
              required
            />
            <Field
              type="date"
              name="endDate"
              title="end date of the event"
              min={today}
              required
            />
            <h4>Select the event notification time </h4>
            <div>
              <Field
                type="time"
                title="event notification time"
                name="notificationTime"
                required
              />
              <button type="submit">Create</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addEvent,
};

export default connect(null, mapDispatchToProps)(EventFormTime);
