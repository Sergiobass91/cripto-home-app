import React, { useState, useEffect } from "react";
import { getFiats } from "../services/getFiats";

const Search = ( {onChange} ) => {

  const [fiats, setfiats] = useState([]);

  useEffect(() => {
    (async () => {
      fiats.length === 0 ? setfiats(await getFiats("/fiats/all")) : fiats;
      console.log("file: Search.jsx ~ setfiats");
    })(); //?auto invoke
  }, []);

  return (
    <div>
      <label>Elige una moneda</label>
      <select
        className="m-3 border-solid border-black text-black"
        onChange={onChange}
      >
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
  );
};

export default Search;
