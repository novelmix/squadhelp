import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import CONSTANTS from '../../../constants';
import styles from './OffersList.module.sass';
import { changeShowImage } from '../../../store/slices/contestByIdSlice';
import LightBox from 'react-image-lightbox';
import { updateOfferForModerator } from '../../../store/slices/offersSlice';
import SpinnerLoader from '../../Spinner/Spinner';

const OffersList = (props) => {
  const {
    isFetching,
    offers,
    showImage,
    updateOffer,
    isShowOnFull,
    imagePath,
    pageNumber,
    getContent,
    count
  } = props;
  useEffect(() => {
    getContent();
  }, [pageNumber]);
  const moderatorStatusHandler = (offerId, status) =>
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => updateOffer({ offerId, status, pageNumber }),
        },
        {
          label: 'No',
        },
      ],
    });

  return (
    <>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() =>
            showImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      {isFetching ? (
        <SpinnerLoader />
      ) : (
        <div className={styles.moderatorInfoContainer}>
          {count ? offers.map(
            ({
              User: { avatar, firstName, lastName, email },
              id,
              fileName,
              text,
            }) => (
              <div className={styles.infoContainer} key={id}>
                <img
                  src={
                    avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : `${CONSTANTS.publicURL}${avatar}`
                  }
                  alt="user"
                />
                <div className={styles.nameAndEmail}>
                  <span>{`${firstName} ${lastName}`}</span>
                  <span>{email}</span>
                </div>
                <div className={styles.responseContainer}>
                  {fileName !== null ? (
                    <img
                      onClick={() =>
                        showImage({
                          isShowOnFull: true,
                          imagePath: fileName,
                        })
                      }
                      className={styles.responseLogo}
                      src={`${CONSTANTS.publicURL}${fileName}`}
                      alt="logo"
                    />
                  ) : (
                    <span className={styles.response}>{text}</span>
                  )}
                </div>
                <div className={styles.btnsContainer}>
                  <div
                    onClick={() => moderatorStatusHandler(id, 'confirmed')}
                    className={styles.resolveBtn}
                  >
                    Confirm
                  </div>
                  <div
                    onClick={() => moderatorStatusHandler(id, 'rejected')}
                    className={styles.rejectBtn}
                  >
                    Reject
                  </div>
                </div>
              </div>
            )
          ): <div className={styles.notFound}>Nothing not found</div>}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    contestByIdStore: { isShowOnFull, imagePath },
    offersStore: { offers, isFetching, count },
  } = state;
  return { isShowOnFull, imagePath, offers, isFetching, count };
};
const mapDispatchToProps = (dispatch) => ({
  updateOffer: (data) => dispatch(updateOfferForModerator(data)),
  showImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
