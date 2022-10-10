const FiatList = ({ onChange, fiats }) => {
  return (
    <div className="pl-4 pt-2 inline-grid grid-cols-3 row-span-1 text-center items-center">
      <label>Currency: </label>
      <select
        className="m-2 appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
