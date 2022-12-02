import React from "react";
import { addLocalCurrency, deltaPercentage } from "../../models/commonCurrency";
import DeletedIcon from "../../assets/icons/DeleteIcon";

const CoinStack = ({ data, handleRemove, infoToSelect }) => {


  //Encuentra index del array de cryptos segun codigo de moneda, para otras funcioes
  const findIndexCode = (wallletCode) => {
    const index = infoToSelect.findIndex((coin) => coin.code === wallletCode);
    return index;
  };

  //Obtiene la cantidad monetaria segun el valor actual de la cripto
  const valueInCurrency = ({ quantity, code }) => {
    const currentValue = infoToSelect[findIndexCode(code)].rate;
    const amountInWallet = (currentValue * quantity) / 1; //? 1 porque es valor por unidad
    return addLocalCurrency(amountInWallet, "USD");
  };

  //Estilos variables en funcion de valor actual vs valor almacenado
  const CustomStyles = (data) => {
    const currentValue = infoToSelect[findIndexCode(data.code)].rate;
    if (currentValue > data.initValue) {
      return "text-green-500";
    }
    if (currentValue < data.initValue) {
      return "text-red-500";
    } else return "text-blue-500";
  };

  return (
    <>
      <div
        className="grid grid-rows-1 grid-cols-1 justify-items-center sm:grid-cols-5 items-center m-auto py-2 bg-[#364056] mb-2 rounded hover:bg-[#3371A7] text-white hover:transition-all hover:duration-100 hover:ease-in"
      >
        <div className="flex flex-col items-center">
          <img src={data.icon} className="h-10 w-10 hover:animate-bounce"></img>
          <p>{data.code}</p>
        </div>
        <div>
          <p className={CustomStyles(data)}>
            <strong>{`u${valueInCurrency(data)}`}</strong>
          </p>
          <p>
            Cantidad: <strong>{data.quantity}</strong>
          </p>
        </div>
        <p>
          {deltaPercentage(infoToSelect[findIndexCode(data.code)].delta.hour)}
        </p>
        <p>{data.date}</p>
        <DeletedIcon cursor="pointer" onClick={() => handleRemove(data.code)} />
      </div>
    </>
  );
};

export default CoinStack;
