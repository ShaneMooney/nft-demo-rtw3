import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [wallet, setWalletAddress] = useState('');
  const [collection, setCollectionAddress] = useState('');
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    let nfts;

    console.log('fetching nfts');

    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;
    const fetchURL = `${baseURL}?owner=${wallet}`;

    var requestOptions = { method: 'GET' };

    if (!collection.length) {
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log('fetching nfts for collection owned by address');
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}`;

      var requestOptions = { method: 'GET' };

      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );

      if (nfts) {
        console.log('NFTs in collection:', nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={'text'}
          placeholder="Add the collection address"
        ></input>
        <label>
          <input
            type={'checkbox'}
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
          ></input>
          Fetch for collection
        </label>
        <button
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Home;
