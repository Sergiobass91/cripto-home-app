const FiatList = ( {onChange, fiats} ) => {

  return (
    <div>
      <label>Elige una moneda</label>
      <select
        className="m-3 border-solid border-black text-black"
        onChange={onChange}
      >
        <option value="" disabled>
          USD
        </option>
        {fiats.map((fiat) => (
          <option value={fiat.code} key={fiat.code}>
            {fiat.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiatList;
