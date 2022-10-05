import { addLocalCurrency } from "../models/commonCurrency";

const Coin = ( {coin, fiat} ) => {

  return (
    <div className="single-coin">
      <img className="h-12 w-12 mx-12 my-2" src={coin.webp64} alt={coin.name}></img>
      <h4>{coin.name}</h4>
      <p className="text-green-600">{coin.code}</p>
      <p className="coin-rate">{addLocalCurrency(coin.rate, fiat)}</p>
      <p className="coin-volume">{addLocalCurrency(coin.volume, fiat)}</p>
      <p className="coin-cap">{addLocalCurrency(coin.cap, fiat)}</p>
    </div>
  );
};

export default Coin;
