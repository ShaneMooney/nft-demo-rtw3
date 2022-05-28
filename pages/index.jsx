import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { NFTCard } from './components/nftCard';

const Home = () => {
  const [wallet, setWalletAddress] = useState('');
  const [collection, setCollectionAddress] = useState('');
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [pagification, setPagification] = useState('');

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
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${'true'}&startToken=${pagification}`;

      var requestOptions = { method: 'GET' };

      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );

      if (nfts) {
        console.log('NFTs in collection:', nfts);
        setNFTs(nfts.nfts);
        setPagification(nfts.nextToken);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
          disabled={fetchForCollection}
          className="w-2/5 rounded-lg bg-slate-100 py-2 px-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        ></input>
        <input
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={'text'}
          placeholder="Add the collection address"
          className="w-2/5 rounded-lg bg-slate-100 py-2 px-2 text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        ></input>
        <label className="text-gray-600">
          <input
            type={'checkbox'}
            className="mr-2"
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
          ></input>
          Fetch for collection
        </label>
        <button
          className="mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500"
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
      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-6">
        {NFTs.length && NFTs.map((nft) => <NFTCard nft={nft}></NFTCard>)}
      </div>
      <button
        className="mt-3 w-1/5 rounded-sm bg-blue-400 px-4 py-2 text-white disabled:bg-slate-500"
        onClick={() => {
          setNFTs([]);
          fetchNFTsForCollection();
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Home;
