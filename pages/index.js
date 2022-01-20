import React, { useContext } from 'react'
import { ethers } from 'ethers'
import { GlobalContext } from '../context/GlobalState'
import { getName } from '../utils/name'

// components
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Loading } from '../components/Loading'
import { ConnectWallet } from '../components/ConnectWallet'

const Main = () => {
  const { user, setUser } = useContext(GlobalContext);
  const {
    isSigningIn,
    loggedIn,
    connection,
    account,
    name,
    } = user;

  async function signIn() {
    const authData = await fetch(`/api/authenticate?address=${account}`)
    const user = await authData.json()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const signature = await signer.signMessage(user.nonce.toString())
    setUser({
      isSigningIn: true,
    });
    const response = await fetch(`/api/verify?address=${account}&signature=${signature}`)
    const data = await response.json()
    const address = await signer.getAddress();
    const ensName = await provider.lookupAddress(address);
    const name = getName({ ensName, address });
    setUser({ 
      name,
      ensName,
      address,
      loggedIn: data.authenticated,
      isSigningIn: false,
    });
  }

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
                <button className="btn btn-primary" onClick={signIn}>Sign In</button>
            )}
            {
              isSigningIn && (
                <Loading />
            )}
            {
              loggedIn && (
                <h1 className="text-2xl font-bold lg:text-4xl">Welcome, {name}</h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Main 