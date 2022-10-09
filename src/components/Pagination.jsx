import React from "react";

const Pagination = ({
  search,
  page,
  totalPage,
  handleChange,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-around mb-8">
      <input
        placeholder="Search coin..."
        value={search}
        onChange={handleChange}
        className="border-solid border-gray-600 border rounded"
      ></input>
      <div>
        <button
          className="border rounded-md border-black"
          onClick={handlePrevPage}>👈
        </button>

        <span>{page + 1} de {totalPage}</span>
        
        <button 
          className="border rounded-md border-black"
          onClick={handleNextPage}>👉
        </button>
      </div>
    </div>
  );
};

export default Pagination;
