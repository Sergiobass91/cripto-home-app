import React, { useState, useEffect, createContext } from "react";
import { getFiats } from "../services/getFiats";
import { getCredits } from "../services/getCredits";
import Header from "./Header";
import CoinList from "./CoinList";
import FiatList from "./FiatList";
import Footer from "./Footer";

export const FiatContext = createContext();

const FiatProvider = () => {
  const [fiats, setfiats] = useState([]);
  const [currentFiat, setCurrentFiat] = useState("USD");

  useEffect(() => {

    (async () => {
      fiats.length === 0 ? setfiats(await getFiats("/fiats/all")) : fiats;
      console.info("Credits:", await getCredits("/credits")); //?para desarrollo
      console.log("file: FiatProvider.jsx ~ useEffect ");
    })(); //?auto invoke

  }, [currentFiat]);

  const fiatHandler = async (e) => setCurrentFiat(e.currentTarget.value);

  return (
    <FiatContext.Provider value={currentFiat}>
      <Header />
      <FiatList onChange={fiatHandler} fiats={fiats}/>
      <CoinList />
      {/* <Footer/> */}
    </FiatContext.Provider>
  );
};

export default FiatProvider;
