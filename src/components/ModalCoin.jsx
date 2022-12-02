import ReactModal from "react-modal";
import DownArrowIcon from "../assets/icons/DownArrowIcon";
import UpArrowIcon from "../assets/icons/UpArrowIcon";
import { addLocalCurrency, deltaPercentage } from "../models/commonCurrency";

ReactModal.setAppElement("#root");

const ModalCoin = ({ onOpen, setToClose, coin, fiat }) => {

  const handleCloseModal = () => {
    setToClose(false);
  };

  const customStyleRate = (rate) => {
    return parseFloat(rate) > 1 ? "text-green-500" : "text-red-500";
  }

  const customResourceRate = (rate) => {
    return parseFloat(rate) > 1 ? <UpArrowIcon/> : <DownArrowIcon/>;
  }

  const styleForModal = {
    overlay: {
      top: "40%",
      left: "50%",
      width: "80%",
      height: "300px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
    },
    content: {
      border: "1px solid #ccc",
      background: "#313A50",
      overflow: "auto",
      borderRadius: "10px",
      outline: "none",
      padding: "20px",
    },
  };

  return (
    <ReactModal isOpen={onOpen} style={styleForModal}>

      <button onClick={handleCloseModal} className="text-white text-2xl absolute top-4">X</button>

        <div className="grid grid-cols-8 h-full">

          {/* Seccion imagen */}
          <div className="flex flex-col col-span-2 justify-center items-center">
            <img
              className="w-20 h-20"
              src={coin?.webp64}
              alt={coin.name}
            ></img>
            <div className="text-center">
              <h1 className="font-bold text-lg text-white">{coin.name}</h1>
              <p className="font-thin text-white">{coin.code}</p>
            </div>
          </div>
          {/* Seccion imagen */}

        <div className="col-span-6 my-auto">
          <div className="grid grid-cols-6 gap-8">
            <div>
              <h5>Cur. value</h5>
              <p className="text-white font-semibold">{addLocalCurrency(coin.rate, fiat)}</p>
            </div>
            <div>
              <h5>Max value</h5>
              <p className="text-white font-semibold">{addLocalCurrency(coin.allTimeHighUSD, fiat)}</p>
            </div>
            <div>
              <h5>Capital</h5>
              <p className="text-white font-semibold">{addLocalCurrency(coin.cap, fiat)}</p>
            </div>
            <div>
              <h5>Hour</h5>
              <p className={customStyleRate(coin.delta.hour)}>{deltaPercentage(coin.delta.hour)}</p>
              {customResourceRate(coin.delta.hour)}
            </div>
            <div>
              <h5>Day</h5>
              <p className={customStyleRate(coin.delta.day)}>{deltaPercentage(coin.delta.day)}</p>
              {customResourceRate(coin.delta.day)}
            </div>
            <div>
              <h5>Day</h5>
              <p className={customStyleRate(coin.delta.month)}>{deltaPercentage(coin.delta.month)}</p>
              {customResourceRate(coin.delta.month)}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalCoin;
