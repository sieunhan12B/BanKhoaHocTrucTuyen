import React from "react";

const FormSearchProduct = ({ className = "mx-8" }) => {
  return (
    <div className={`search flex-1 max-w-xl  ${className}`}>
      <form action="" className="w-full relative">
        <input
          placeholder="Tìm kiếm..."
          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
          type="search"
        />
      </form>
    </div>
  );
};

export default FormSearchProduct;
