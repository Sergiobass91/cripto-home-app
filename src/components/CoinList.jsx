import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Coin from "./Coin";
import { getCoins } from "../services/getCoins";
import Pagination from "./Pagination";



const CoinList = () => {

  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [Searchcoins, setSearchCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(980); //TODO
  const [loading, setLoading] = useState(true);

  const { currency } = useSelector((state) => state.fiat);

  useEffect(() => {

    setLoading(true);

    (async () => {
      setCoins(await getCoins("/coins/list", currency, 20, page));
    })();

    setLoading(false);
  }, [currency, page, Searchcoins]);

  //buscar moneda especifica
  const handleChange = async (e) => {
    const _targetSearch = e.target.value;
    setSearchCoins(_targetSearch ? await getCoins("/coins/list", currency, 400, page) : []);
    setSearch(_targetSearch);
  }

  //filtra resultados
  const results = !search ? Searchcoins : Searchcoins.filter((val) => val.name.toLowerCase().includes(search.toLowerCase()));

  //Paginador {
  const handleNextPage = () => setPage(page +1);
  const handlePrevPage = () => page !== 0 ? setPage(page - 1) : setPage(page);
  //}

  console.log(results.length)

  return (
    <>
      <Pagination search={search} page={page} totalPage={totalPage} handleChange={handleChange} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage}/>
      <main className="flex justify-center">
        <div className="w-3/5">
          <div className="grid grid-cols-6">
            <p className="mx-12 text-teal-500">Symbol</p>
            <p className="text-teal-500">Name</p>
            <p className="text-teal-500">Code</p>
            <p className="text-teal-500">Price</p>
            <p className="text-teal-500">Volume</p>
            <p className="text-teal-500">Market Capital</p>
          </div>
          {results.length === 0 && (
            coins.map((coin) => {
            return <Coin key={coin.code} coin={coin} fiat={currency} loading={loading}></Coin>;
            })
          ) || (results.map((coin) => {
            return <Coin key={coin.code} coin={coin} fiat={currency} loading={loading}></Coin>;
            }))
          }
        </div>
      </main>
    </>
  );
};

export default CoinList;
