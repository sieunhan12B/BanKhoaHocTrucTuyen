import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { danhMucService } from "../../services/danhMuc.service";
import { useState, useEffect } from "react";

const CustomDropdownHeader = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    danhMucService
      .getCategory()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Dropdown
        dropdownRender={() => (
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto">
            <h3 className="text-gray-500 font-medium mb-2">DANH MỤC</h3>
            <ul className="space-y-2">
              {categories.map(({ id, categoryName, categoryId }) => (
                <Link
                  key={id}
                  to={`/category/${categoryId}`}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <span className="text-gray-700">{categoryName}</span>
                </Link>
              ))}
            </ul>
          </div>
        )}
        placement="bottom"
        trigger={["hover"]}
      >
        <span className="flex items-center space-x-2 cursor-pointer py-3 lg:border-none border-b">
          <span className="font-medium">Khóa học</span>
          <DownOutlined style={{ fontSize: "12px" }} />
        </span>
      </Dropdown>
    </>
  );
};

export default CustomDropdownHeader;
