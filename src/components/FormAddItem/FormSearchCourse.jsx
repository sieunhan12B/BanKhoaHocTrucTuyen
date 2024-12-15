import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Dropdown, Image } from "antd";

const FormSearchCourse = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const [checkDropdown, setCheckDropdown] = useState(false);
  const [listJobSuggest, setListJobSuggest] = useState([
    {
      key: 1,
      label: "Hello",
    },
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCheckDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(valueSearch);
    navigate(`${path.listCourse}?tenKhoaHoc=${valueSearch}`);
  };

  useEffect(() => {
    if (valueSearch) {
      // Gọi API lấy dữ liệu sản phẩm để gợi ý người dùng
      khoaHocService
        .getCourseByName(valueSearch)
        .then((res) => {
          console.log(res);
          const newListJobSuggest = res.data.data
            .slice(0, 4)
            .map((item, index) => {
              console.log(item);
              return {
                key: index.toString(),
                label: (
                  <Link
                    to={`/courses-detail/${item.maKhoaHoc}`}
                    className="flex items-center space-x-4"
                  >
                    <Image
                      src={`http://localhost:8080/Image/${item.hinhAnh}`}
                      className="h-14"
                      width={100}
                      alt=""
                    />
                    <div>
                      <h4>{item.tenKhoaHoc}</h4>
                      <p>{item.giaTien}</p>
                    </div>
                  </Link>
                ),
              };
            });
          console.log(newListJobSuggest);
          setListJobSuggest(newListJobSuggest);
          setCheckDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [valueSearch]);

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    if (!event.target.value) {
      setCheckDropdown(false);
    }
  };
  return (
    <div ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listJobSuggest,
          }}
          open={checkDropdown}
        >
          <div className="pl-4 rounded-md border border-gray-400 flex items-center justify-between min-w-[400px]">
            <input
              type="text"
              placeholder="Vui lòng nhập vào công việc cần kiếm"
              className="flex-1 focus:border-none focus:outline-none"
              onChange={handleChange}
              value={valueSearch}
            />
            <button type="submit" className="p-2">
              Tìm kiếm
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchCourse;
