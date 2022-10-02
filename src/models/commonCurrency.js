export const addLocalCurrency = (rate, fiat) => {
  return (
    "$" +
    Intl.NumberFormat("en-US").format(rate, {
      style: "currency",
      currency: fiat,
    })
  );
};