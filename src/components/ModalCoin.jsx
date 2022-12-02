import ReactModal from "react-modal";
import { addLocalCurrency, deltaPercentage } from "../models/commonCurrency";

ReactModal.setAppElement("#root");

const ModalCoin = ({ onOpen, setToClose, coin, fiat }) => {
  const handleCloseModal = () => {
    setToClose(false);
  };

  const styleForModal = {
    overlay: {
      top: "40%",
      left: "50%",
      width: "80%",
      height: "500px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    content: {
      border: "1px solid #ccc",
      background: "#293143",
      overflow: "auto",
      WebkitOverflowScrolling: "none",
      borderRadius: "10px",
      outline: "none",
      padding: "50px",
    },
  };

  return (
    <ReactModal isOpen={onOpen} style={styleForModal}>
      <div className="grid grid-cols-6 w-[60%]">
        <p className="text-teal-500 ">Price</p>
        <p className="text-teal-500">Volume</p>
        <p className="text-teal-500">Market Capital</p>
        <p className="text-teal-500">1 Hour</p>
        <p className="text-teal-500">1 Day</p>
        <p className="text-teal-500">1 Month</p>
      </div>

      <div className="grid grid-flow-col gap-8 pt-8">
        <button
          onClick={handleCloseModal}
          className="text-white text-2xl absolute top-7"
        >
          X
        </button>

        <div className="flex items-start">
          <img
            className="h-full mx-auto"
            src={coin?.webp64}
            alt={coin.name}
          ></img>
          <div className="">
            <h1 className="font-bold text-lg text-white">{coin.name}</h1>
            <p className="font-thin text-white">{coin.code}</p>
          </div>
        </div>

        <p className="text-white">{addLocalCurrency(coin.rate, fiat)}</p>
        <p className="text-white">{addLocalCurrency(coin.volume, fiat)}</p>
        <p className="text-white">{addLocalCurrency(coin.cap, fiat)}</p>
        <p className="text-white">{deltaPercentage(coin.delta.hour)}</p>
        <p className="text-white">{deltaPercentage(coin.delta.day)}</p>
        <p className="text-white">{deltaPercentage(coin.delta.month)}</p>
      </div>
    </ReactModal>
  );
};

export default ModalCoin;
