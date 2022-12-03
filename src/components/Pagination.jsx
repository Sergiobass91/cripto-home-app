import { DebounceInput } from "react-debounce-input";

const Pagination = ({
  search,
  page,
  totalPage,
  handleChange,
  handleNextPage,
  handlePrevPage,
  SearchCoins,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full max-w-[1000px] mb-8">
      <DebounceInput
        className="block appearance-none w-full max-w-[500px] bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        minLength={2}
        debounceTimeout={300}
        onChange={handleChange}
        value={search}
        placeholder="Buscar crypto..."
      ></DebounceInput>
      <div className="flex justify-center items-center space-x-3">
        {SearchCoins.length === 0 && (
          <div className="flex justify-center items-center space-x-3">
            <button
              className="border rounded-md bg-gray-100 p-3 flex items-center justify-center text-2xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
              onClick={handlePrevPage}
            >
              {"<"}
            </button>

            <span className="text-slate-500">
              {page + 1} / {totalPage}
            </span>

            <button
              className="border rounded-md bg-gray-100 p-3 flex items-center justify-center text-2xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm"
              onClick={handleNextPage}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
