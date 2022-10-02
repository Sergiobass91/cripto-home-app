import React, { useState, useEffect } from "react";
import { getCoins } from "./services/getCoins";
import { getFiats } from "./services/getFiats";
import { getCredits } from "./services/getCredits";
import { getOverview } from "./services/getOverview";

const App = () => {
  const [fiats, setfiats] = useState([]);
  const [currentFiat, setCurrentFiat] = useState("USD");
  const [coins, setcoins] = useState([]);
  const [overview, setOverwise] = useState(null);

  useEffect(() => {

    (async () => {
      if( fiats.length === 0 ) {
        setfiats(await getFiats( "/fiats/all"));
      }

      setcoins(await getCoins("/coins/list", currentFiat));
      setOverwise(await getOverview("/overview", currentFiat));

      console.info("Credits:", await getCredits("/credits")); //?para desarrollo

      console.log("Use effect");
    })(); //?auto invoke
    
  }, [currentFiat]);


  //Currency format
  const addLocalCurrency = (rate, fiat) => {
    return "$" + Intl.NumberFormat("en-US")
      .format(rate, {
          style: "currency",
          currency: fiat,
      })
  };
  
  const fiatHandler = async (e) => setCurrentFiat(e.currentTarget.value);

  return (
    <>
      <header>{
        overview && (<aside>Capital: {addLocalCurrency(overview.cap, currentFiat)} Volume: {addLocalCurrency(overview.volume, currentFiat)} Liquidity: {addLocalCurrency(overview.liquidity, currentFiat)}</aside>)
      }
        
      </header>

      <div>
        <label>Elige una moneda</label>
        <select className="bg-orange-800 rounded m-3" onChange={fiatHandler}>
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

      <div>
        {coins.map((coin) => (
          <p key={coin.code}>
            {coin.name} - {addLocalCurrency(coin.rate, currentFiat)}
          </p>
        ))}
      </div>
    </>
  );
};

export default App;
