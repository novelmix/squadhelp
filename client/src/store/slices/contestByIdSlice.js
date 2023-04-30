import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
} from '../../utils/store';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
  fileDownload: null,
};

//---------- getContestById
export const getContestById = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  thunk: async (payload) => {
    const { data } = await restController.getContestById(payload);
    const { Offers } = data;
    delete data.Offers;
    return { contestData: data, offers: Offers };
  },
});

const getContestByIdExtraReducers = createExtraReducers({
  thunk: getContestById,
  pendingReducer: (state) => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  },
  fulfilledReducer: (state, { payload: { contestData, offers } }) => {
    state.isFetching = false;
    state.contestData = contestData;
    state.error = null;
    state.offers = offers;
  },
  rejectedReducer,
});

export const downloadContestFile = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/downloadContestFile`,
  thunk: async (payload) => {
    const { data } = await restController.downloadContestFile(payload);
    const a = document.createElement("a");
    const file = new Blob([data], { type: data.type });
    const fileURL = URL.createObjectURL(file);
    a.href= fileURL
    a.setAttribute("download", payload);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
});

const downloadContestFileExtraReducers = createExtraReducers({
  thunk: downloadContestFile,
  pendingReducer: (state) => {
    state.isFetching = true;
    state.error = null;
  },
  fulfilledReducer: (state) => {
    state.isFetching = false;
    state.error = null;
  },
  rejectedReducer,
});

//---------- addOffer
export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  thunk: async (payload) => {
    const { data } = await restController.setNewOffer(payload);
    return data;
  },
});

const addOfferExtraReducers = createExtraReducers({
  thunk: addOffer,
  fulfilledReducer: (state, { payload }) => {
    state.offers.unshift(payload);
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.addOfferError = payload;
  },
});

//---------- setOfferStatus
export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: async (payload) => {
    const { data } = await restController.setOfferStatus(payload);
    return data;
  },
});

const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setOfferStatus,
  pendingReducer: (state) => {
    state.isFetching = true;
    state.setOfferStatusError = null;
  },
  fulfilledReducer: (state, { payload }) => {
    state.offers.forEach((offer) => {
      if (payload.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
        payload.id === offer.id
        ? CONSTANTS.OFFER_STATUS_WON
        : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (payload.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    state.isFetching = false;
    state.setOfferStatusError = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.setOfferStatusError = payload;
  },
});

//---------- changeMark
export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: async (payload) => {
    const { data } = await restController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});

const changeMarkExtraReducers = createExtraReducers({
  thunk: changeMark,
  fulfilledReducer: (state, { payload: { data, offerId, mark } }) => {
    state.offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === offerId) {
        offer.mark = mark;
      }
    });
    state.error = null;
  },
  rejectedReducer: (state, { payload }) => {
    state.changeMarkError = payload;
  },
});

//-----------------------------------------------------

const reducers = {
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  clearAddOfferError: (state) => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: (state) => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: (state) => {
    state.changeMarkError = null;
  },
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};

const extraReducers = (builder) => {
  getContestByIdExtraReducers(builder);
  addOfferExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
  changeMarkExtraReducers(builder);
  downloadContestFileExtraReducers(builder);
};

const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;
