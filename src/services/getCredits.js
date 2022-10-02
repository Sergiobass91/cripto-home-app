import { ajax } from '../tools/fetch';
import { URL_BASE, HEADER_BASE } from "../models/commonheader";

export const getCredits = async (path) =>{
    return await ajax(URL_BASE, path, HEADER_BASE);
};