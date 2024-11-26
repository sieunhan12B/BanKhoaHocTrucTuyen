import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { useState, useEffect } from "react";

const CustomDropdownHeader = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    khoaHocService
      .getCategory()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Dropdown
        dropdownRender={() => (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-gray-500 font-medium mb-2">DANH MỤC</h3>
            <ul className="space-y-2">
              {categories.map(({ id, maDanhMuc, icon, tenDanhMuc }) => (
                <Link
                  key={id}
                  to={`/category/${maDanhMuc}`}
                  className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{icon}</span>
                  <span className="text-gray-700">{tenDanhMuc}</span>
                </Link>
              ))}
            </ul>
          </div>
        )}
        placement="bottom"
        trigger={["hover"]}
      >
        <span className="flex items-center space-x-2 cursor-pointer py-3 lg:border-none border-b">
          <span className="text-lg font-medium">Khóa học</span>
          <DownOutlined style={{ fontSize: "12px" }} />
        </span>
      </Dropdown>
    </>
  );
};

export default CustomDropdownHeader;
