import React from "react";

const Coin = ( {coin} ) => {
  return (
    <div className="single-coin">
      <img className="h-12 w-12 mx-12 my-2" src={coin.webp64} alt={coin.name}></img>
      <h4>{coin.name}</h4>
      <p className="text-green-600">{coin.code}</p>
      <p className="coin-rate">{coin.rate}</p>
      <p className="coin-volume">{coin.volume}</p>
      <p className="coin-cap">{coin.cap}</p>
    </div>
  );
};

export default Coin;
