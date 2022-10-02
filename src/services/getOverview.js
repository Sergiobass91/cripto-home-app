import { ajax } from '../tools/fetch';
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getOverview = async ( path, fiat) => {
    const body = {
        currency: fiat ?? "USD",
      };

    return await ajax(URL_BASE, path, HEADER_BASE, body);
};