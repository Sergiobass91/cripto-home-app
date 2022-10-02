import { ajax } from '../tools/fetch';

export const getOverview = async (path, fiat) => {
    const body = {
        currency: fiat ?? "USD",
      };

    return await ajax(path, body);
};