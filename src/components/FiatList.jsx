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
    <div className="flex text-center items-center justify-start gap-2">
      <label className="text-[#293143]">Currency: </label>
      <select
      className="border rounded bg-white text-[#293143] h-10 pl-5 pr-16 text-sm focus:outline-none"
        defaultValue={currency}
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
