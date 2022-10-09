import { ajax } from '../tools/fetch';
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getCoins = async (path, fiat, limit, page) => {
    const body = {
        currency: fiat ?? "USD",
        sort: "rank",
        order: "ascending",
        offset: (limit * page),
        limit,
        meta: true,
      };

    return await ajax(URL_BASE, path, HEADER_BASE, body);
};