import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { getOverview } from "../services/getOverview";
import { addLocalCurrency } from "../models/commonCurrency";
import { getFiats } from "../services/getFiats";
import { FiatContext } from "./FiatProvider";



const Header = () => {

  const [overview, setOverwise] = useState(null);
  const [fiats, setfiats] = useState([]);

  const currentFiat = useContext(FiatContext);

  useEffect(() => {

    (async () => {
      fiats.length === 0 ? setfiats(await getFiats("/fiats/all")) : fiats;
      setOverwise(await getOverview("/overview", currentFiat));
      console.log("file: Header.jsx ~ useEffect");
    })();

  }, [currentFiat]);
  
  

  return (
      <header className="flex justify-around h-48 md:h-40 bg-[#293143] text-white">
        {/* <img
          className="absolute left-1 top-0 md:top-6 invisible sm:visible"
          src="src\assets\icons\ch_logo.png"
        /> */}
        <div className="flex flex-col text-center justify-around w-3/4">
          <ul className="flex gap-4 text-xl justify-end pt-2">
            <Link to="signup"> Sign Up</Link>
            <Link to="login"> Login</Link>
            <Link to="about"> About Us</Link>
          </ul>
          <h1 className="font-serif text-4xl pb-8">Cripto Home</h1>
          {(overview && (
            <div className="flex justify-around flex-wrap">
              <strong className="text-green-500">
                Capital:
                <span className="text-white">
                  {" "}
                  {addLocalCurrency(overview.cap, currentFiat)}
                </span>
              </strong>
              <strong className="text-green-500">
                Volume:
                <span className="text-white">
                  {" "}
                  {addLocalCurrency(overview.volume, currentFiat)}
                </span>
              </strong>

              <strong className="text-green-500">
                Liquidity:
                <span className="text-white">
                  {" "}
                  {addLocalCurrency(overview.liquidity, currentFiat)}
                </span>
              </strong>
            </div>
          )) || <h3>loading...</h3>}
        </div>
      </header>
  );
};

export default Header;
