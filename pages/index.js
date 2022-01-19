import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { GlobalContext } from '../context/GlobalState';

const ConnectWallet = () => {
    const { user, setUser } = useContext(GlobalContext);
    const {
      loggedIn,
      ensName,
      address,
      connection,
      account,
     } = user;

    async function getWeb3Modal() {
      let Torus = (await import('@toruslabs/torus-embed')).default
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions: {
          torus: {
            package: Torus
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: '8cf3cad623da43f9a84ab5ac94230cf6'
            },
          },
        },
      })
      return web3Modal
    }

    async function connect() {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setUser({ ...user, connection, account: accounts[0] })
    }

    async function signIn() {
      const authData = await fetch(`/api/authenticate?address=${account}`)
      const user = await authData.json()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const signature = await signer.signMessage(user.nonce.toString())
      const response = await fetch(`/api/verify?address=${account}&signature=${signature}`)
      const data = await response.json()
      const address = await signer.getAddress();
      const ensName = await provider.lookupAddress(address);
      setUser({ 
        ...user,
        ensName,
        address,
        loggedIn: data.authenticated,
      })
    }

    return (
      <main className="flex h-screen text-center">
        <div className="m-auto md:w-1/2">
          <div className="grid grid-cols-1 lg:p-10 lg:bg-base-200 rounded-box mb-5">
          { !connection && (
              <button className="btn btn-primary" onClick={connect}> Connect Wallet</button>
          )}
          { connection && !loggedIn && (
              <button className="btn btn-primary" onClick={signIn}>Sign In</button>
          )}
          {
            loggedIn && (
              <h1 className="text-2xl font-bold lg:text-4xl">Welcome, {ensName ? ensName : address}</h1>
          )}
          </div>
        </div>
      </main>
    )
}

export default ConnectWallet