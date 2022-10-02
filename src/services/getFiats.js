import { ajax } from "../tools/fetch";

export const getFiats = async (path) => {
    return ajax(path)
};