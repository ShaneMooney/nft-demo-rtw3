export const NFTCard = ({ nft }) => {
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
          <p className="text-gray-600">
            {`${nft.contract.address.substr(0, 6)}
              ...
              ${nft.contract.address.substr(nft.contract.address.length - 4)}`}
          </p>
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
