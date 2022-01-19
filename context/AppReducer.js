import React from 'react';

export default (state, action) => {
  console.log('state: ', state);
  console.log('action:', action);
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