export const addLocalCurrency = (rate, fiat) => {
  return (
    "$" +
    Intl.NumberFormat("en-US").format(rate, {
      style: "currency",
      currency: fiat,
    })
  );
};

export const deltaPercentage = (delta) => {
  return `${Number.parseFloat(`${(delta - 1) * 100}%`).toFixed(2)}%`;
};
