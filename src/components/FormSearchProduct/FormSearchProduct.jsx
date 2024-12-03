import React from "react";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

const FormSearchProduct = ({
  className = "mx-8",
  title = "Tìm kiếm...",
  onSearch = () => {},
}) => {
  const handleSearch = (e) => {
    const searchTerm = removeVietnameseTones(e.target.value)
      .toLowerCase()
      .trim();
    onSearch(searchTerm);
  };

  return (
    <div className={`search flex-1 max-w-xl  ${className}`}>
      <form action="" className="w-full relative">
        <input
          placeholder={title}
          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
          type="search"
          onChange={handleSearch}
        />
      </form>
    </div>
  );
};

export default FormSearchProduct;
