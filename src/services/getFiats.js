import { ajax } from "../tools/fetch";
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getFiats = async (path) => {
    return ajax(URL_BASE, path, HEADER_BASE)
};