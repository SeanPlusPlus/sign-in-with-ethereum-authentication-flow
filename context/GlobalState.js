import React, {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import AppReducer from './AppReducer';
import { log } from '../utils/logger'

const initialState = {
  user: {
    loggedIn: false,
  },
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function setUser(data) {
    dispatch({
      type: 'UPDATE_USER',
      payload: data 
    });
  }

  useEffect(() => {
    log('state', 'green', state);
  }, [state])

  return ( <GlobalContext.Provider value = {
      {
        user: state.user,
        setUser,
      }
    } > {
      children
    } </GlobalContext.Provider>
  )
}