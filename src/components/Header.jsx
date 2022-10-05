import React, { useState, useEffect, useContext } from "react";
import { getFiats } from "../services/getFiats";
import { FiatContext } from "./FiatProvider";
import NavBar from "./NavBar";
import Overview from "./Overview";


const Header = () => {

  const [fiats, setfiats] = useState([]);

  const currentFiat = useContext(FiatContext);

  useEffect(() => {

    (async () => {
      fiats.length === 0 ? setfiats(await getFiats("/fiats/all")) : fiats;
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
          <NavBar/>
          <h1 className="font-serif text-5xl pb-8">Cripto Home</h1>
          <Overview/>
        </div>
      </header>
  );
};

export default Header;
