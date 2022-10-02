import React from 'react';
import { Coin } from '../components/Coin';

const CoinList = ( { coins }) => {

  //buscar moneda especifica
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
    
  //filtra resultados
  const results = !search ? coins : coins.filter((val) => val.name.toLowerCase().includes(search.toLowerCase()));

  const CoinData = () => {
    return (
      <>
        <div className="flex justify-center mt-2">
          <input placeholder="Search coin..." value={search} onChange={handleChange}></input>
        </div>
        <main className="flex justify-center mt-4 pb-4">
          <div className="w-3/5">
            <div className="flex justify-around">
              <p className="mx-12 text-teal-500">Symbol</p>
              <p className="text-teal-500">Name</p>
              <p className="text-teal-500">Code</p>
              <p className="text-teal-500">Price</p>
              <p className="text-teal-500">Volume</p>
              <p className="text-teal-500">Market Capital</p>
            </div>
            {results.map((coin, index) => {
              return <Coin key={index} coin={coin}></Coin>;
            })}
          </div>
        </main>
      </>
    );
  };
    return <CoinData />;
};

export default CoinList;
