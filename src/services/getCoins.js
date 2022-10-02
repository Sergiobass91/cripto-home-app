import { ajax } from '../tools/fetch';

export const getCoins = async (path, fiat) => {
    const body = {
        currency: fiat ?? "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 100,
        meta: true,
      };

    return await ajax(path, body);
};