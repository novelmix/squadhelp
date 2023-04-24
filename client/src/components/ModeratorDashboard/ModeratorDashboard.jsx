import React, { useState } from 'react';
import { connect } from 'react-redux';
import OffersList from './OffersList/OffersList';
import ReactPaginate from 'react-paginate';
import styles from './ModeratorDashboard.module.sass';
import Error from '../Error/Error';
import { clearOfferError } from '../../store/slices/offersSlice';

const ModeratorDashboard = (props) => {
  const { isFetching, lastPageNumber, error, clearError } = props;
  const [pageNumber, setPageNumber] = useState(0);
  const pageNumberHandler = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };
  return (
    <>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearError}
        />
      )}
      <OffersList pageNumber={pageNumber} />
      {isFetching || (
        <div>
          <ReactPaginate
            previousLabel={'«'}
            nextLabel={'»'}
            pageCount={lastPageNumber}
            onPageChange={pageNumberHandler}
            forcePage={pageNumber}
            breakLabel={'...'}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            containerClassName={styles.pagination}
            previousLinkClassName={styles.pagination__link}
            nextLinkClassName={styles.pagination__link}
            disabledClassName={styles.pagination__link_disabled}
            activeClassName={styles.pagination__link_active}
          />
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    offersStore: { isFetching, lastPageNumber, error },
  } = state;
  return { isFetching, lastPageNumber, error };
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearOfferError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
