import { log } from '../utils/logger'

const getName = (payload) => {
  const { ensName, address } = payload;

  if (!address) {
    return null;
  }

  if (ensName) {
    return ensName;
  }
 
  return address.substring(address.length - 4);
}

export default (state, action) => {
  log('prev state', 'gray', state);
  log('action', 'red', action);
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          name: getName(action.payload),
        }
      }
      default:
        return state;
  }
}