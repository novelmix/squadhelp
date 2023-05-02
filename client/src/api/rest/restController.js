import http from '../interceptor';
import queryString from 'query-string';
import CONSTANTS from '../../constants';

export const registerRequest = (data) => http.post('auth/registration', data); //auth
export const loginRequest = (data) => http.post('auth/login', data);
export const getUser = () => http.post('auth/checkAuth');
export const refreshUser = async () => {
  const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
  const { data } = await http.post('auth/refreshSession', { refreshToken });
  return data;
};
export const logOut = () => {
  localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
  localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
};

export const payMent = (data) => http.post('users/pay', data); //user
export const changeMark = (data) => http.patch('users/changeMark', data);
export const updateUser = (data) => http.put('users/updateUser', data);
export const cashOut = (data) => http.post('users/cashout', data);

export const getPreviewChat = () => http.get('chats/getPreview'); //chat
export const getDialog = (data) =>
  http.get(`chats/getChat/${data.interlocutorId}`);
export const newMessage = (data) => http.post('chats/newMessage', data);
export const changeChatFavorite = (data) =>
  http.patch('chats/changeChatFavorite', data);
export const changeChatBlock = (data) =>
  http.patch('chats/changeChatBlock', data);
export const getCatalogList = (data) => http.get('chats/getCatalogList', data);
export const addChatToCatalog = (data) =>
  http.put(`chats/addNewChatToCatalog/${data.catalogId}`, data);
export const createCatalog = (data) => http.post('chats/createCatalog', data);
export const deleteCatalog = (data) =>
  http.delete(`chats/deleteCatalog/${data.catalogId}`);
export const removeChatFromCatalog = (data) =>
  http.delete(`chats/removeChatFromCatalog/${data.catalogId}/${data.chatId}`);
export const changeCatalogName = (data) =>
  http.patch(`chats/updateNameCatalog/${data.catalogId}`, data);

export const getOffers = ({ limit, offset }) =>
  http.get(`offers/moderator?${queryString.stringify({ limit, offset })}`); //offer

export const updateOfferForModerator = (data) =>
  http.patch(`offers/moderator/${data.offerId}`, data); //offer

export const setNewOffer = ({ contestId, data }) =>
  http.post(`offers/${contestId}/addOffer`, data);
export const setOfferStatus = (data) =>
  http.patch('offers/setOfferStatus', data);

export const dataForContest = (contestType) =>
  http.get(`contests/dataForContest/${contestType}`); //contest
export const updateContest = (data) => http.put('contests/updateContest', data);
export const downloadContestFile = (fileName) =>
  http.get(`contests/downloadFile/${fileName}`, { responseType: 'blob' });
export const getContestById = (data) =>
  http.get(`contests/getContestById/${data.contestId}`);
export const getCustomersContests = ({ limit, offset, status }) =>
  http.get(
    `contests/getCustomersContests/${status}?${queryString.stringify({
      limit,
      offset,
    })}`
  );

export const getCreativeContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.get(
    `contests/getCreativeContests?${queryString.stringify({
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    })}`
  );
