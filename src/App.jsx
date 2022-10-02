import React, { useState, useEffect } from "react";
import { getCoins } from "./services/getCoins";
import { getFiats } from "./services/getFiats";
import { getCredits } from "./services/getCredits";
import CoinList from "./components/CoinList";
import Header from "./components/Header";

const App = () => {
  // TODO: Move states to a separate component
  const [fiats, setfiats] = useState([]);
  const [currentFiat, setCurrentFiat] = useState("USD");
  const [coins, setcoins] = useState([]);

  useEffect(() => {

    (async () => {

      fiats.length === 0 ? setfiats(await getFiats( "/fiats/all")) : fiats;

      setcoins(await getCoins("/coins/list", currentFiat));

      console.info("Credits:", await getCredits("/credits")); //?para desarrollo
      console.log("?? ~ file: App.jsx ~ useEffect ");

    })(); //?auto invoke
  }, [currentFiat]);

  const fiatHandler = async (e) => setCurrentFiat(e.currentTarget.value);

  return (
    <div className="font-mono">
      <Header fiat={currentFiat}/>

      <div>
        <label>Elige una moneda</label>
        <select className="m-3 border-solid border-black" onChange={fiatHandler}>
          <option value="" disabled>
            USD
          </option>
          {fiats.map((fiat) => (
            <option value={fiat.code} key={fiat.code}>
              {fiat.code}
            </option>
          ))}
        </select>
      </div>

      <CoinList coins={coins} fiat={currentFiat} />
    </div>
  );
};

export default App;
