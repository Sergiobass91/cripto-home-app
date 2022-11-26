import { addLocalCurrency, deltaPercentage } from "../models/commonCurrency";

const Coin = ( {coin, fiat, loading} ) => {

  return ( 
    loading ? (<h1>Cargando</h1>) :
    <div className="w-full grid grid-rows-1 px-3 py-2 grid-cols-1 sm:grid-cols-12 items-center justify-items-start bg-[#293143] rounded my-2 hover:bg-[#3371A7] text-white hover:transition-all hover:duration-100 hover:ease-in">
      <img className="h-10 w-10 col-span-1 mx-auto" src={coin?.webp64} alt={coin.name}></img>
      <h4 className="col-span-2 mx-auto">{coin.name}</h4>
      <p className="text-green-600 col-span-2 mx-auto">{coin.code}</p>
      <p className="coin-rate col-span-2 mx-auto">{addLocalCurrency(coin.rate, fiat)}</p>
      <p className="coin-volume col-span-2 mx-auto">{addLocalCurrency(coin.volume, fiat)}</p>
      <p className="coin-cap col-span-2 mx-auto">{addLocalCurrency(coin.cap, fiat)}</p>
      {/* <p className="coin-cap">{deltaPercentage(coin.delta.hour)}</p>
      <p className="coin-cap">{deltaPercentage(coin.delta.year)}</p>
      <p className="coin-cap">{deltaPercentage(coin.delta.month)}</p> */}
    </div>
  );
};

export default Coin;
