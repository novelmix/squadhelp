import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import SubHeader from './SubHeader/SubHeader';
import { logOut } from '../../api/rest/restController'

const Header = (props) => {
  const { data, getUserStore, clearUser, history, events, isFetching } = props;
  useEffect(() => {
    if (!data) {
      getUserStore();
    }
  }, [data]);

  const logOutHandler = () => {
    logOut();
    clearUser();
    history.replace('/login');
  };

  const countEvents = (array) => {
    return array.filter(
      (e) =>
        Date.now() >= Date.parse(e.notificationTime) ||
        Date.parse(e.notificationTime) > Date.parse(e.endedAt)
    ).length;
  };

  const startContests = () => history.push('/startContest');

  return (
    <header>
      {isFetching ? null : (
        <SubHeader
          data={data}
          startContests={startContests}
          events={events}
          countEvents={countEvents}
          logOut={logOutHandler}
        />
      )}
    </header>
  );
};
const mapStateToProps = (state) => {
  const { userStore, eventsStore } = state;
  return { ...userStore, ...eventsStore };
};
const mapDispatchToProps = (dispatch) => ({
  getUserStore: () => dispatch(getUser()),
  clearUser: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
