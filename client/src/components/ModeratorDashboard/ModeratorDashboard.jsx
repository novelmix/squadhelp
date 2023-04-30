import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import OffersList from './OffersList/OffersList';
import ReactPaginate from 'react-paginate';
import styles from './ModeratorDashboard.module.sass';
import { getOffers } from '../../store/slices/offersSlice';
import TryAgain from '../TryAgain/TryAgain';

const ModeratorDashboard = (props) => {
  const {
    isFetching,
    lastPageNumber,
    error,
    offers,
    getOffersStore,
  } = props;
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (offers.length === 0) {
      setPageNumber(pageNumber - 1);
    }
  }, [lastPageNumber]);
  const pageNumberHandler = ({ selected: selectedPage }) => {
    setPageNumber(selectedPage);
  };
  const getContent = () => getOffersStore(pageNumber);
  return (
    <main>
      {error && (
        <div className={styles.tryAgain}>
          <TryAgain getData={getContent} />
        </div>
      )}
      <OffersList pageNumber={pageNumber} getContent={getContent} />
      {isFetching || (
        <div>
          {lastPageNumber <= 1 || (
            <ReactPaginate
              previousLabel={'«'}
              nextLabel={'»'}
              pageCount={lastPageNumber}
              onPageChange={pageNumberHandler}
              forcePage={pageNumber < 0 ? 0 : pageNumber}
              breakLabel={'...'}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              containerClassName={styles.pagination}
              previousLinkClassName={styles.pagination__link}
              nextLinkClassName={styles.pagination__link}
              disabledClassName={styles.pagination__link_disabled}
              activeClassName={styles.pagination__link_active}
            />
          )}
        </div>
      )}
    </main>
  );
};
const mapStateToProps = (state) => {
  const {
    offersStore: { offers, isFetching, lastPageNumber, error },
  } = state;
  return { isFetching, lastPageNumber, error, offers };
};

const mapDispatchToProps = (dispatch) => ({
  getOffersStore: (data) => dispatch(getOffers(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard);
