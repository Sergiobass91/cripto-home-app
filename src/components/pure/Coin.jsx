import { useState } from "react";
import { addLocalCurrency } from "../../models/commonCurrency";
import ModalCoin from "../ModalCoin";

const Coin = ({ coin, fiat, loading }) => {


  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="w-full grid grid-rows-1 px-3 py-2 grid-cols-1 sm:grid-cols-12 items-center justify-items-start bg-[#293143] rounded my-2 hover:bg-[#3371A7] text-white hover:transition-all hover:duration-100 hover:ease-in">
      <button className="mx-auto" onClick={()=> setIsOpenModal(true)}>
        <img
          className="h-10 w-10 col-span-1 mx-auto"
          src={coin?.webp64}
          alt={coin.name}
        ></img>
      </button>
      <h4 className="col-span-2 mx-auto">{coin.name}</h4>
      <p className="text-green-600 col-span-2 mx-auto">{coin.code}</p>
      <p className="coin-rate col-span-2 mx-auto">
        {addLocalCurrency(coin.rate, fiat)}
      </p>
      <p className="coin-volume col-span-2 mx-auto">
        {addLocalCurrency(coin.volume, fiat)}
      </p>
      <p className="coin-cap col-span-2 mx-auto">
        {addLocalCurrency(coin.cap, fiat)}
      </p>
      <ModalCoin onOpen={isOpenModal} setToClose={setIsOpenModal} coin={coin} fiat={fiat}/>
    </div>
  );
};

export default Coin;
