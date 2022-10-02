import { ajax } from '../tools/fetch';

export const getCredits = async (path) =>{
    return await ajax(path);
};