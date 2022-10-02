import React, { useState, useEffect } from "react";
import { getOverview } from "../services/getOverview";
import { addLocalCurrency } from "../models/commonCurrency";

const Header = ({ fiat }) => {
  const [overview, setOverwise] = useState(null);

  useEffect(() => {
    (async () => {
      setOverwise(await getOverview("/overview", fiat));
      console.log("?? ~ file: Header.jsx ~ useEffect");
    })();
  }, [fiat]);

  return (
    <header className="flex justify-around h-48 md:h-40 bg-[#293143] text-white">
      <img className="absolute left-1 top-0 md:top-6 invisible sm:visible" src="src\assets\icons\ch_logo.png"/>
      <div className="flex flex-col text-center justify-around w-3/5">
        <h1 className="font-serif text-4xl">Cripto Home</h1>
        {(overview && (
          <div className="flex justify-around flex-wrap">
            <strong className="text-green-500">Capital:
              <span className="text-white"> {addLocalCurrency(overview.cap, fiat)}</span>
            </strong>
            <strong className="text-green-500">Volume:
              <span className="text-white"> {addLocalCurrency(overview.volume, fiat)}</span>
            </strong>

            <strong className="text-green-500">Liquidity:
              <span className="text-white"> {addLocalCurrency(overview.liquidity, fiat)}</span>
            </strong>
          </div>
        )) || <h3>loading...</h3>}
      </div>
    </header>
  );
};

export default Header;
