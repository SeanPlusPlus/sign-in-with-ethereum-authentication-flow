import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const title = 'Auth'

export const Nav = () => {
  const { user } = useContext(GlobalContext);
  const {
    loggedIn,
    name,
  } = user;
 
  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">
          <div className="flex">
            <img src="/ethereum.svg" className="h-9 mr-4" />
          </div>
        </span>
      </div> 
      {
        !loggedIn && (
          <div className="flex-none">
            <div className="avatar">
              <div className="rounded h-12 m-1">
                <button className="btn btn-info pointer-events-none">
                  <div className="m-auto">
                    Ethereum Signin
                  </div>
                </button> 
              </div>
            </div>
          </div>
      )}
      {
        loggedIn && (
          <div className="flex-none">
            <div className="avatar">
              <div className="rounded h-12 m-1">
                <button className="btn btn-info">
                  <div className="m-auto">
                    {name}
                  </div>
                </button> 
              </div>
            </div>
          </div>
      )}
    </div>
  )
}