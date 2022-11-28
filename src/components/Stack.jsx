import React, { useState, useEffect } from "react";
import { getCoins } from "../services/getCoins";
import { getSingleCoin } from "../services/getSingleCoin";
import { useSelector } from "react-redux";
import { dataCollection, writeCoinDocument } from "../services/firebaseCommons";
import { addLocalCurrency, deltaPercentage } from "../models/commonCurrency";
import { userAuth } from "../auth/useAuth";
import { db } from "../auth/firebase_config";
import Select from 'react-select';

const Stack = () => {

  const [infoToSelect, setInfoToSelect] = useState([]);
  const [singleCoin, setSingleCoin] = useState(null);
  const [code, setCode] = useState(null);
  const [input, setInput] = useState(null);
  const [walletUserData, setwalletUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { currency } = useSelector((state) => state.fiat);
  const { uid } = userAuth();
  
  useEffect(() => {
    
    (async () => {
      infoToSelect.length === 0 ? setInfoToSelect(await getCoins("/coins/list", "USD", 450, 0)) : infoToSelect;
      setwalletUserData(await dataCollection(db, uid));

    })();

    setIsLoading(false);

  }, [singleCoin]);

  const fiatHandlerOnChange = async ({ value }) => {
    setCode(value);
    setSingleCoin(await getSingleCoin("/coins/single", "USD", value));
  };

  const quantityHandleOnChange = (e) => {
    setInput(e.currentTarget.value);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    await writeCoinDocument(db, uid, code, input, singleCoin.rate, singleCoin.delta.hour, singleCoin.webp32);
    setwalletUserData(await dataCollection(db, uid));
    const form = document.querySelector("#form");
    form.reset();
  };

  const findIndexCode = (wallletCode) => {
    const index = infoToSelect.findIndex(coin => coin.code === wallletCode);
    return index;
  }

  const valueInCurrency = ({ quantity, code }) => {
    const currentValue = infoToSelect[findIndexCode(code)].rate;
    const amountInWallet = (currentValue * quantity) / 1; //? 1 porque es valor por unidad
    return addLocalCurrency(amountInWallet, "USD");
  }

  const CustomStyles = ( data ) =>{

    const currentValue = infoToSelect[findIndexCode(data.code)].rate;
    if (currentValue >  data.initValue) {
      return "text-green-500"
    }
    if (currentValue <  data.initValue) {
      return "text-red-500"
    }
    else
      return "";
  }

  return (
    <div className="min-h-[calc(100vh-240px)] px-4">
      <form onSubmit={handleSave} className="grid gap-4 items-center sm:grid-cols-3 my-8 w-full max-w-[1000px] mx-auto " id="form">
      <div>
          <label name="coin">Moneda: </label>
          <Select
            onChange={fiatHandlerOnChange}
            options={infoToSelect.map( (info) => ( {label: info.name, value: info.code} ))}
            isLoading={isLoading}
          >
          </Select>
        </div>

        <div className="mx-auto">
          <label htmlFor="quantity">Cantidad: </label>
          <br/>
          <input id="quantity" name="quantity" type="number" step="0.01" onChange={quantityHandleOnChange} className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white h-full font-boldmt-3 py-2 rounded focus:outline-none focus:shadow-outline">Guardar</button>
      </form>

      <div className="w-full max-w-[1000px] mx-auto">
        <h1 className="text-center mb-4"><strong>Tu portolio</strong></h1>
        {!walletUserData && (<h1>Empeza cargar a criptos a tu portfolio</h1>)
        || 
        (walletUserData.map((data) => 
        (
          <>
            <div className="grid grid-cols-6 items-center max-w-[650px] m-auto py-2 bg-[#293143] mb-2 rounded hover:bg-[#3371A7] text-white hover:transition-all hover:duration-100 hover:ease-in" key={data.code}>
              <img src={data.icon} className="h-10 w-10 col-span-1 mx-auto"></img>
              <p>{data.code}</p>
              <div>
                <p className={CustomStyles(data)}><strong>{valueInCurrency(data)}</strong></p>
                <p>Qty: <strong>{(data.quantity)}</strong></p>
              </div>
              <p>{deltaPercentage(infoToSelect[findIndexCode(data.code)].delta.hour)}</p>
              <p>{data.date}</p>
              <p>Eliminar</p>

            </div>
          </>
        )
        ))
        }
      </div>
    </div>
  );
}

export default Stack;