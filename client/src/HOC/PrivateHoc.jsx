import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../store/slices/userSlice';
import Spinner from '../components/Spinner/Spinner';

const PrivateHoc = (Component, anyProps) => {
  const Hoc = (props) => {
    const { error, getUser, isFetching, history, match } = props;
    useEffect(() => {
      getUser();
    }, []);
    if (error) {
      return <Redirect to="/login" />;
    } else {
      return (
        <>
          {isFetching ? (
            <Spinner />
          ) : (
            <Component history={history} match={match} {...anyProps} />
          )}
        </>
      );
    }
  };

  const mapStateToProps = (state) => state.userStore;

  const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUser(data)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};

export default PrivateHoc;
