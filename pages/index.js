import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

// components
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'
import { ConnectWallet } from '../components/ConnectWallet'
import { SignIn } from '../components/SignIn'
import { Welcome } from '../components/Welcome'

const Main = () => {
  const { user } = useContext(GlobalContext);
  const {
    loggedIn,
    connection,
    isSigningIn,
  } = user;

  return (
    <>
      <Header />
      <Nav />
      <main className="flex text-center pt-10">
        <div className="m-auto md:w-1/2">
          <div className="grid grid-cols-1 lg:p-10 lg:bg-base-200 rounded-box mb-5">
            { !connection && (
                <ConnectWallet />
            )}
            { connection && !loggedIn && !isSigningIn && (
                <SignIn />
            )}
            {
              isSigningIn && (
                <Loading />
            )}
            {
              loggedIn && (
                <Welcome />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Main 