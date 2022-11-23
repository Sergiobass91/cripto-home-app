import { ajax } from '../tools/fetch';
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getSingleCoin = async (path, fiat, code) => {
    const body = {
        code: code,
        currency: fiat ?? "USD",
        meta: true,
      };

    return await ajax(URL_BASE, path, HEADER_BASE, body);
};