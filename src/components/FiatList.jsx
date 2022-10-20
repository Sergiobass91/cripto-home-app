import React, { useState, useEffect } from "react";
import { getFiats } from "../services/getFiats";
import { useDispatch, useSelector } from "react-redux";
import { setFiat } from "../reducers/fiatSlice";
// import Select from 'react-select';

const FiatList = () => {

  const [fiats, setfiats] = useState([]);
  const { currency } = useSelector((state) => state.fiat);

  useEffect(() => {

    (async () => {
      fiats.length === 0 ? setfiats(await getFiats("/fiats/all")) : fiats;
    })(); //?auto invoke
    
  }, []);

  const dispatch = useDispatch();
  const fiatHandlerOnChange = async (e) => {
    dispatch(
      setFiat({currency: e.currentTarget.value})
    );
  }


  return (
    <div className="pl-4 pt-2 inline-grid grid-cols-3 row-span-1 text-center items-center">
      <label>Currency: </label>
      <select
        defaultValue={currency}
        className=""
        onChange={fiatHandlerOnChange}
        // options={ parseJson }
        // options={"USD"}
      >
        {fiats.map((fiat) => (
          <option value={fiat.code} key={fiat.code}>
            {fiat.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiatList;
