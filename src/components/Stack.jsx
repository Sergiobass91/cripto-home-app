import React, { useState, useEffect } from "react";
import { getCoins } from "../services/getCoins";
import { getSingleCoin } from "../services/getSingleCoin";
import {
  dataCollection,
  writeCoinDocument,
  deleteCoinDocument,
} from "../services/firebaseCommons";
import { userAuth } from "../auth/useAuth";
import EmptyIcon from "../assets/icons/EmptyIcon";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import ButtonForm from "./pure/ButtonForm";
import CoinStack from "./pure/CoinStack";
import SkeletonCoin from "./Skeleton";
import { errorToast } from "../models/commonToast";

const Stack = () => {
  const [infoToSelect, setInfoToSelect] = useState([]);
  const [singleCoin, setSingleCoin] = useState(null);
  const [code, setCode] = useState(null);
  const [input, setInput] = useState(null);
  const [walletUserData, setWalletUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadUseEffect, SetReloadUseEffect] = useState(null); //TODO: improve array dependency
  const { uid, displayName } = userAuth();

  useEffect(() => {
    setIsLoading(true);

    //carga datos para la seleccion
    (async () => {
      try {
        infoToSelect.length === 0
          ? setInfoToSelect(await getCoins("/coins/list", "USD", 450, 0))
          : infoToSelect;
        setWalletUserData(await dataCollection(uid));
      } catch (e) {
        errorToast("Algo saliÛ mal, por favor volvÈ a intentarlo");
      } finally {
        setIsLoading(false);
      }
    })();

    
  }, [reloadUseEffect]);

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

    if (code === null || input === null)
      return errorToast("Debes completar los campos primero");

    try {
      await writeCoinDocument(
        uid,
        code,
        input,
        singleCoin.rate,
        singleCoin.delta.hour,
        singleCoin.webp64
      );
    } catch (e) {
      errorToast("Completa todos los campos antes");
    } finally {
      setInput(null);
      setCode(null);
    }

    setWalletUserData(await dataCollection(uid));
    const form = document.querySelector("#form");
    form.reset();
  };

  //Elimina de la BD
  const handleRemove = async (code) => {
    await deleteCoinDocument(uid, code);
    setWalletUserData(await dataCollection(uid));
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

        <div className="sm:mx-auto">
          <label htmlFor="quantity">Cantidad: </label>
          <br />
          <input
            id="quantity"
            name="quantity"
            type="number"
            step="0.01"
            onChange={quantityHandleOnChange}
            className="shadow appearance-none text-black bg-white border rounded py-2 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>
        <ButtonForm
          text="Guardar"
          classes="bg-green-500 hover:bg-green-700 text-white h-4/5 align-bottom font-bold mt-3 py-2 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </ButtonForm>
      </form>

      <div className="w-full max-w-[1000px] mx-auto">
        <h1 className="text-center mb-4 font-bold text-2xl text-black">
          Tu porfolio, {displayName}
        </h1>

        {!isLoading && walletUserData.length > 0 && (
          <div className="hidden sm:grid grid-flow-col justify-items-center font-semibold">
            <p className="text-black">Cripto</p>
            <p className="text-black">Tienes</p>
            <p className="text-black pl-7">1 hora</p>
            <p className="text-black">
              Actualizaci√≥n
            </p>
            <p className="text-black">Borrar</p>
          </div>
        )}

        {isLoading && (
          <SkeletonCoin count={5} width="100%" height={60} duration={2} />
        )}
        {!isLoading && walletUserData.length === 0 && (
          <div className="flex flex-col items-center">
            <EmptyIcon />

            <h1 className="text-2xl mt-4 mb-8 text-black text-center">
              Parece que aun no tenes criptos en tu billetera, empez√° a guardar
              ahora.
            </h1>
          </div>
        )}
        {!isLoading &&
          walletUserData.map((data) => (
            <CoinStack
              key={data.code}
              data={data}
              code={code}
              handleRemove={handleRemove}
              infoToSelect={infoToSelect}
            />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Stack;
