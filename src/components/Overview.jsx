import React, { useState, useEffect, useContext } from "react";
import { FiatContext } from "./FiatProvider";
import { getOverview } from "../services/getOverview";
import { addLocalCurrency } from "../models/commonCurrency";

const Overview = () => {

  const [overview, setOverwise] = useState(null);

  const currentFiat = useContext(FiatContext);

  useEffect(() => {
    (async () => {
      setOverwise(await getOverview("/overview", currentFiat));
      console.log("file: OverviewHeader.jsx ~ useEffect");
    })();
  }, [currentFiat]);

  return (
    <>
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
      )) || <h3>Loading...</h3>}
    </>
  );
};

export default Overview;
