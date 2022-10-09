import { addLocalCurrency, deltaPercentage } from "../models/commonCurrency";

const Coin = ( {coin, fiat, loading} ) => {

  return ( 
  
    loading ? (<h1>Cargando</h1>) :
    <div className="single-coin">
      <img className="h-12 w-12 mx-12 my-2" src={coin.webp64} alt={coin.name}></img>
      <h4>{coin.name}</h4>
      <p className="text-green-600">{coin.code}</p>
      <p className="coin-rate">{addLocalCurrency(coin.rate, fiat)}</p>
      <p className="coin-volume">{addLocalCurrency(coin.volume, fiat)}</p>
      <p className="coin-cap">{addLocalCurrency(coin.cap, fiat)}</p>
      {/* <p className="coin-cap">{deltaPercentage(coin.delta.hour)}</p>
      <p className="coin-cap">{deltaPercentage(coin.delta.year)}</p>
      <p className="coin-cap">{deltaPercentage(coin.delta.month)}</p> */}
    </div>
  );
};

export default Coin;
