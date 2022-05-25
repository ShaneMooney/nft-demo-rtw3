import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");
    if(!collection.length) {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const baseURL = "https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/";
      const fetchURL = `${baseURL}?owner=${wallet}`;
      
      nfts = fetch()
    } else {

    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input onChange={(e) => {setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e) => {setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label><input type={"checkbox"}></input></label>
        <button onClick={
          () => {
            fetchNFTs()
          }
        }>Let's go</button>
      </div>
    </div>
  )
}

export default Home
