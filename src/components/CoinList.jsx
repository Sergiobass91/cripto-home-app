import React, { useState, useEffect, useContext } from "react";
import Coin from "./Coin";
import { getCoins } from "../services/getCoins";
import { FiatContext } from "./FiatProvider";
import Pagination from "./Pagination";

const CoinList = () => {

  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(980); //TODO
  const [loading, setLoading] = useState(true);

  const fiat = useContext(FiatContext);

  useEffect(() => {
    (async () => {
      setCoins(await getCoins("/coins/list", fiat, 20, page));
      console.log("file: CoinList.jsx ~ useEffect");
    })();
    setLoading(false);
  }, [fiat, page]);

  //buscar moneda especifica
  const handleChange = (e) => setSearch(e.target.value);

  //filtra resultados
  const results = !search ? coins : coins.filter((val) => val.name.toLowerCase().includes(search.toLowerCase()));

  //Paginador {
  const handleNextPage = () => setPage(page +1);
  const handlePrevPage = () => page !== 0 ? setPage(page - 1) : setPage(page);
  //}

  return (
    <>
      <Pagination search={search} page={page} totalPage={totalPage} handleChange={handleChange} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
      <main className="flex justify-center">
        <div className="w-3/5">
          <div className="flex justify-evenly">
            <p className="mx-12 text-teal-500">Symbol</p>
            <p className="text-teal-500">Name</p>
            <p className="text-teal-500">Code</p>
            <p className="text-teal-500">Price</p>
            <p className="text-teal-500">Volume</p>
            <p className="text-teal-500">Market Capital</p>
          </div>
          {/* { (search.length ==! 0 && results.length < 1)  && (<h1 className="text-center mt-20 text-4xl">Coin not found</h1>)} */}
          {results && (
            results.map((coin) => {
            return <Coin key={coin.code} coin={coin} fiat={fiat} loading={loading}></Coin>;
            })
          )}
        </div>
      </main>
    </>
  );
};

export default CoinList;
