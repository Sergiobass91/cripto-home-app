import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOverview } from "../services/getOverview";
import { addLocalCurrency } from "../models/commonCurrency";

const Overview = () => {

  const [overview, setOverwise] = useState(null);
  const { currency } = useSelector((state) => state.fiat);

  useEffect(() => {

    const intervalOveview = setInterval(() => {
      (async () => {
        setOverwise(await getOverview("/overview", currency));
      })();
    }, 10000)

    return () => clearInterval(intervalOveview);

    // (async () => {
    //   setOverwise(await getOverview("/overview", currency));
    // })();

  }, [currency]);

  return (
    <>
      {(overview && (
        <div className="flex justify-around gap-2 flex-wrap">
          <strong className="text-[#f39649]">
            Capital Total:
            <span className="text-white">
              {" "}
              {addLocalCurrency(overview.cap, currency)}
            </span>
          </strong>
          <strong className="text-[#f39649]">
            Volumen total:
            <span className="text-white">
              {" "}
              {addLocalCurrency(overview.volume, currency)}
            </span>
          </strong>

          <strong className="text-[#f39649]">
            Liquidez Total:
            <span className="text-white">
              {" "}
              {addLocalCurrency(overview.liquidity, currency)}
            </span>
          </strong>
        </div>
      )) || <h3>Loading...</h3>}
    </>
  );
};

export default Overview;
