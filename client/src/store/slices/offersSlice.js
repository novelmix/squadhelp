import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';

const OFFER_SLICE_NAME = 'offer';
const MAX_LIMIT = 6;
const initialState = {
  isFetching: false,
  error: null,
  offers: [],
  lastPageNumber: 0,
  count: 0
};

const getOffers = decorateAsyncThunk({
  key: `${OFFER_SLICE_NAME}/getOffers`,
  thunk: async (pageNumber) => {
    const limit = MAX_LIMIT;
    const offset = pageNumber * limit;
    const {
      data: { offers, count },
    } = await restController.getOffers({ limit, offset });
    const lastPageNumber = Math.ceil(count / MAX_LIMIT);
    return { offers, lastPageNumber, count };
  },
});

const updateOfferForModerator = decorateAsyncThunk({
  key: `${OFFER_SLICE_NAME}/updateOfferForModerator`,
  thunk: async (payload, { dispatch, getState }) => {
    await restController.updateOfferForModerator(payload);
      dispatch(getOffers(payload.pageNumber));
  },
});

const offerSlice = createSlice({
  name: OFFER_SLICE_NAME,
  initialState,
  reducers: {
    clearOfferError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOffers.pending, pendingReducer);
    builder.addCase(getOffers.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.offers = payload.offers;
      state.lastPageNumber = payload.lastPageNumber;
      state.count = payload.count;
    });
    builder.addCase(getOffers.rejected, rejectedReducer);
    builder.addCase(updateOfferForModerator.pending, pendingReducer);
    builder.addCase(updateOfferForModerator.fulfilled, fulfilledReducer);
    builder.addCase(updateOfferForModerator.rejected, rejectedReducer);
  },
});

const { actions, reducer } = offerSlice;
export const { clearOfferError } = actions;
export { getOffers, updateOfferForModerator };

export default reducer;
