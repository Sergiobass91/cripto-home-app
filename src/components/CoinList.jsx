import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Coin from "./pure/Coin";
import { getCoins } from "../services/getCoins";
import Pagination from "./Pagination";
import SkeletonCoin from "./Skeleton";

const CoinList = () => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [SearchCoins, setSearchCoins] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(980); //TODO
  const [loading, setLoading] = useState(true);

  const { currency } = useSelector((state) => state.fiat);

  useEffect(() => {
    getCoins("/coins/list", currency, 20, page)
      .then((totalCoins) => {
        setCoins(totalCoins);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [currency, page, SearchCoins]);

  //buscar moneda especifica
  const handleChange = async (e) => {
    const _targetSearch = e.target.value;
    setSearchCoins(
      _targetSearch ? await getCoins("/coins/list", currency, 400, page) : []
    );
    setSearch(_targetSearch);
  };

  //filtra resultados
  const results = !search
    ? SearchCoins
    : SearchCoins.filter((val) =>
        val.name.toLowerCase().includes(search.toLowerCase())
      );

  //Paginador {
  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => (page !== 0 ? setPage(page - 1) : setPage(page));
  //}

  return (
    <>
      <Pagination
        search={search}
        page={page}
        totalPage={totalPage}
        handleChange={handleChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        SearchCoins={SearchCoins}
      />
      <main className="flex justify-center ">
        <div className="w-full max-w-[1000px] ">
          <div className="hidden sm:grid grid-cols-12 text-black font-semibold">
            <p className="text-center  col-span-1">Símbolo</p>
            <p className="text-center col-span-2 pl-2">Crypto</p>
            <p className="text-center col-span-2">Código</p>
            <p className="text-center col-span-2">Valor</p>
            <p className="text-center col-span-2">Volúmen</p>
            <p className="text-center col-span-2">Capital</p>
          </div>
          {loading && <SkeletonCoin count={20} height={60} duration={2} />}
          {(!loading &&
            results.length === 0 &&
            coins.map((coin) => {
              return (
                <Coin
                  key={coin.code}
                  coin={coin}
                  fiat={currency}
                  loading={loading}
                ></Coin>
              );
            })) ||
            (!loading &&
              results.map((coin) => {
                return (
                  <Coin
                    key={coin.code}
                    coin={coin}
                    fiat={currency}
                    loading={loading}
                  ></Coin>
                );
              }))}
        </div>
      </main>
    </>
  );
};

export default CoinList;
