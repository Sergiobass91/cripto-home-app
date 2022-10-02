import { ajax } from '../tools/fetch';
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getCoins = async (path, fiat) => {
    const body = {
        currency: fiat ?? "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 100,
        meta: true,
      };

    return await ajax(URL_BASE, path, HEADER_BASE, body);
};