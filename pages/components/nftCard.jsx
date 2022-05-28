import React, { useState } from 'react';

export const NFTCard = ({ nft }) => {
  const [clickEffect, setClickEffect] = useState(false);
  return (
    <div className="flex w-1/4 flex-col">
      <div className="rounded-md">
        <img
          className="h-128 w-full rounded-t-md object-cover"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="h-110 flex flex-col gap-y-2 rounded-b-md bg-slate-100 px-2 py-3">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <div className="flex">
            <p className="text-gray-600">
              {`${nft.contract.address.substr(0, 6)}
                ...
                ${nft.contract.address.substr(
                  nft.contract.address.length - 4
                )}`}
            </p>
            <svg
              className={`${
                clickEffect && 'animate-fadeBack'
              } max-h-5 cursor-pointer px-2 transition duration-100 hover:scale-110`}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setClickEffect(true);
                navigator.clipboard.writeText(nft.contract.address);
              }}
              onAnimationEnd={() => setClickEffect(false)}
            >
              <title />
              <g data-name="1" id="_1">
                <path d="M308.51,450H80.59a15,15,0,0,1-15-15V143.93a15,15,0,0,1,15-15H308.51a15,15,0,0,1,15,15V435A15,15,0,0,1,308.51,450ZM95.59,420H293.51V158.93H95.59Z" />
                <path d="M389.44,369.07H308.51a15,15,0,0,1,0-30h65.93V78H176.52v65.92a15,15,0,0,1-30,0V63a15,15,0,0,1,15-15H389.44a15,15,0,0,1,15,15V354.07A15,15,0,0,1,389.44,369.07Z" />
              </g>
            </svg>
          </div>
        </div>
        <div className="mt-2 flex-grow">
          <p className="text-gray-600">{nft.description?.substr(0, 250)}</p>
        </div>
        <div className="mb-1 flex justify-center">
          <a
            className="rounded-m w-1/2 cursor-pointer bg-blue-500 py-2 px-4 text-center text-white"
            href={`https://etherscan.io/token/${nft.contract.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};
