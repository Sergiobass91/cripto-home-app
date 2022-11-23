import React, { useState, useEffect, useRef } from "react";
import { getCoins } from "../services/getCoins";
import { getSingleCoin } from "../services/getSingleCoin";
import { userAuth } from "../auth/useAuth";
import { db } from "../auth/firebase_config";
import { collection, doc, addDoc, setDoc  } from "firebase/firestore";

const Stack = () => {

  const [walletCoins, setwalletCoins] = useState([]);
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState(null);
  const [input, setInput] = useState(null);
  const refCoin = useRef();
  const { uid } = userAuth();

  
  useEffect(() => {
    
    (async () => {
      walletCoins.length === 0 ? setwalletCoins(await getCoins("/coins/list", "USD", 400, 0)) : walletCoins;
    })();
    
    console.log(selected)
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
    try {
      console.log("?? ~ file: Stack.jsx ~ line 36 ~ docRef ~ input", input)
      await setDoc(doc(db, `portfolio/${uid}/coins/${code}`), {
        quantity: input,
        date: (new Date).toLocaleString()
      });
      console.log("Document written");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-3 my-8 mx-4">
    <div>
        <label name="coin">Moneda</label>
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
  );
}


export default Stack;
