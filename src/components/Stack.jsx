import React, { useState, useEffect, useRef } from "react";
import { getCoins } from "../services/getCoins";
import { getSingleCoin } from "../services/getSingleCoin";
import { dataCollection, writeCoinDocument } from "../services/firebaseCommons";
import { userAuth } from "../auth/useAuth";
import { db } from "../auth/firebase_config";

const Stack = () => {

  const [walletCoins, setwalletCoins] = useState([]);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState(null);
  const [input, setInput] = useState(null);
  const [userData, setUserData] = useState([]);
  const refCoin = useRef();
  const { uid } = userAuth();
  
  useEffect(() => {
    
    (async () => {
      walletCoins.length === 0 ? setwalletCoins(await getCoins("/coins/list", "USD", 400, 0)) : walletCoins;
      setUserData(await dataCollection(db, uid));
    })();
    
  }, [selected]);

  
  const fiatHandlerOnChange = async (e) => {
    setCode(e.currentTarget.value);
    setSelected(await getSingleCoin("/coins/single", "USD", e.currentTarget.value));
  };

  const quantityHandleOnChange = (e) => {
    setInput(e.currentTarget.value);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    await writeCoinDocument(db, uid, code, input);
    setUserData(await dataCollection(db, uid));
    const form = document.querySelector("#form");
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSave} className="grid grid-cols-3 my-8 mx-4" id="form">
      <div>
          <label name="coin">Moneda: </label>
          <select
            onChange={fiatHandlerOnChange}
            ref={refCoin}
          >
            {walletCoins.map((coin) => (
              <option value={coin.code} key={coin.code}>
                {coin.code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Cantidad: </label>
          <input id="quantity" name="quantity" type="number" step="0.01" onChange={quantityHandleOnChange} className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-boldmt-3 px-4 rounded focus:outline-none focus:shadow-outline">Guardar</button>
      </form>

      <div>
        <h1 className="text-center">Tu portolio</h1>
        {!userData && (<h1>Empeza cargar a criptos a tu portfolio</h1>)
        || 
        (userData.map((data) => 
        (
          <>
            <div className="grid grid-cols-3 w-1/2" key={data.code}>
              <p>{data.code}</p>
              <p>{data.quantity}</p>
              <p>{data.date}</p>
            </div>
          </>
        )
        ))
        }
      </div>
    </>
  );
}

export default Stack;