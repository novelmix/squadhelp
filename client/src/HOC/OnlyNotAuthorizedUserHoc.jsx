import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import { getUser } from '../store/slices/userSlice';

const OnlyNotAuthorizedUserHoc = (Component) => {
  const HocForLoginSignUp = (props) => {
    const { isFetching, checkAuth, history, data } = props;
    useEffect(() => {
      checkAuth(history.replace);
    }, []);
    return (
      <>
        {isFetching ? (
          <Spinner />
        ) : (
          <>{!data ? <Component history={history} /> : null}</>
        )}
      </>
    );
  };

  const mapStateToProps = (state) => state.userStore;
  const mapDispatchToProps = (dispatch) => ({
    checkAuth: (replace) => dispatch(getUser(replace)),
  });
  return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
};
export default OnlyNotAuthorizedUserHoc;
