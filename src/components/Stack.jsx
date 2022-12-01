import React, { useState, useEffect, useRef } from "react";
import { getCoins } from "../services/getCoins";
import { getSingleCoin } from "../services/getSingleCoin";
import { dataCollection, writeCoinDocument, deleteCoinDocument } from "../services/firebaseCommons";
import { addLocalCurrency } from "../models/commonCurrency";
import { userAuth } from "../auth/useAuth";
import EmptyIcon from "../assets/icons/EmptyIcon";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import ButtonForm from "./pure/ButtonForm";
import CoinStack from "./pure/CoinStack";

const Stack = () => {

  const [infoToSelect, setInfoToSelect] = useState([]);
  const [singleCoin, setSingleCoin] = useState(null);
  const [code, setCode] = useState(null); //TODO: pasar a ref
  const [input, setInput] = useState(null); //TODO: pasar a ref
  const [walletUserData, setwalletUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadUseEffect, SetReloadUseEffect] = useState(null); //TODO: eliminar para buscar mejor dependencia
  const { uid } = userAuth();

  useEffect(() => {
    console.log("paso aca");
    //carga datos para la seleccion
    (async () => {
      infoToSelect.length === 0
        ? setInfoToSelect(await getCoins("/coins/list", "USD", 450, 0))
        : infoToSelect;
      setwalletUserData(await dataCollection(uid));
    })();

    setIsLoading(false);
  }, [singleCoin, reloadUseEffect]);

  //Manejo de cambio en el select
  const fiatHandlerOnChange = async ({ value }) => {
    setCode(value);
    setSingleCoin(await getSingleCoin("/coins/single", "USD", value));
  };

  //Manejo en el input de cantidad a guardar
  const quantityHandleOnChange = (e) => {
    setInput(e.currentTarget.value);
  };

  //Guarda en la BD
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await writeCoinDocument(
        uid,
        code,
        input,
        singleCoin.rate,
        singleCoin.delta.hour,
        singleCoin.webp32
      );
    } catch (e) {
    }

    setwalletUserData(await dataCollection(uid));
    const form = document.querySelector("#form");
    form.reset();
  };

  //Elimina de la BD
  const handleRemove = async (code) => {
    await deleteCoinDocument(uid, code);
    setwalletUserData(await dataCollection(uid));
    SetReloadUseEffect("cambiando");
  };

  return (
    <div className="min-h-[calc(100vh-240px)] px-4">
      <form
        onSubmit={handleSave}
        className="grid gap-4 items-center sm:grid-cols-3 my-8 w-full max-w-[1000px] mx-auto "
        id="form"
      >
        <div>
          <label name="coin">Moneda: </label>
          <Select
            onChange={fiatHandlerOnChange}
            options={infoToSelect.map((info) => ({
              label: info.name,
              value: info.code,
            }))}
            isLoading={isLoading}
            defaultValue={{ label: "Seleccionar", value: "default" }}
          ></Select>
        </div>

        <div className="mx-auto">
          <label htmlFor="quantity">Cantidad: </label>
          <br />
          <input
            id="quantity"
            name="quantity"
            type="number"
            step="0.01"
            onChange={quantityHandleOnChange}
            className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>
        <ButtonForm text="Guardar" classes="bg-blue-500 hover:bg-blue-700 text-white h-4/5 align-bottom font-boldmt-3 py-2 rounded focus:outline-none focus:shadow-outline">
          Guardar
        </ButtonForm>
      </form>

      <div className="w-full max-w-[1000px] mx-auto">
        <h1 className="text-center mb-4"><strong>Tu portolio</strong></h1>
        {(walletUserData.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h1>
              Parece que aun no tenes cryptos en un billetera, empeza a guardar
              ahora.
            </h1>
            <EmptyIcon />
          </div>
        )) ||
          walletUserData.map((data) => (
            <CoinStack key={data.code} data={data} code={code} handleRemove={handleRemove} infoToSelect={infoToSelect}/>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Stack;
