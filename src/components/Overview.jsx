import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOverview } from "../services/getOverview";
import { addLocalCurrency } from "../models/commonCurrency";

const Overview = () => {

  const [overview, setOverwise] = useState(null);
  const { currency } = useSelector((state) => state.fiat);

  useEffect(() => {

    (async () => {
      setOverwise(await getOverview("/overview", currency));
    })();

  }, [currency]);

  return (
    <>
      {(overview && (
        <div className="flex justify-around gap-2 flex-wrap">
          <strong className="text-green-500">
            Capital:
            <span className="text-white">
              {" "}
              {addLocalCurrency(overview.cap, currency)}
            </span>
          </strong>
          <strong className="text-green-500">
            Volume:
            <span className="text-white">
              {" "}
              {addLocalCurrency(overview.volume, currency)}
            </span>
          </strong>

          <strong className="text-green-500">
            Liquidity:
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
