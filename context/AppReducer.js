import { log } from '../utils/logger'

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
        }
      }
      default:
        return state;
  }
}