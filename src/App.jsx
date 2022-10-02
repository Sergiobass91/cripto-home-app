import React, { useState, useEffect } from "react";
import { getCoins } from "./services/getCoins";
import { getFiats } from "./services/getFiats";
import { getCredits } from "./services/getCredits";

const App = () => {
  const [fiats, setfiats] = useState([]);
  const [currentFiat, setCurrentFiat] = useState("USD");
  const [coins, setcoins] = useState([]);

  useEffect(() => {
    (async () => {
      setfiats(await getFiats("/fiats/all"));

      const fetchCoins = await getCoins("/coins/list", currentFiat);
      console.log("?? ~ file: App.jsx ~ line 20 ~ fetchCoins", fetchCoins);
      setcoins(fetchCoins);

      console.log(await getCredits("/credits")); //?para desarrollo
      console.log("Use effect");
    })(); //?auto invoke
  }, [currentFiat]);

  const fiatHandler = async (e) => setCurrentFiat(e.currentTarget.value);

  return (
    <>
      <div>
        <label>Elige una moneda</label>
        <select className="bg-orange-800 rounded m-3" onChange={fiatHandler}>
          <option value="" disabled>USD</option>
          {fiats.map((fiat) => (
            <option value={fiat.code} key={fiat.code}>
              {fiat.code}
            </option>
          ))}
        </select>
      </div>

      <div>
        {coins.map((coin) => {
          return (
            <p key={coin.code}>
              Coin: {coin.code} - Price: {coin.rate}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default App;
