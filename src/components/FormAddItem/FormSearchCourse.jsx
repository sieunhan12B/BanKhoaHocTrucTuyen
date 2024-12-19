import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { khoaHocService } from "../../services/khoaHoc.service";
import { Dropdown, Image } from "antd";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current) {
        setTimeout(() => {
          setCheckDropdown(false);
        }, 100);
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
      khoaHocService
        .getCourseByName(valueSearch)
        .then((res) => {
          const newListJobSuggest = res.data.data
            .slice(0, 4)
            .map((item, index) => ({
              key: index.toString(),
              label: (
                <Link
                  to={`/courses-detail/${item.maKhoaHoc}`}
                  className="flex items-center space-x-4"
                  onClick={(e) => e.stopPropagation()}
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
            }));
          setListJobSuggest(newListJobSuggest);
          setCheckDropdown(true);
        })
        .catch(console.log);
    }
  }, [valueSearch]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValueSearch(event.target.value);
    if (!event.target.value) {
      setCheckDropdown(false);
    }
  };

  useEffect(() => {
    setCheckDropdown(false);
  }, [location]);

  return (
    <div>
      <form ref={dropdownRef} onSubmit={handleSubmit}>
        <Dropdown
          menu={{ items: listJobSuggest }}
          trigger={["click"]}
          open={checkDropdown}
        >
          <div className="pl-4  border border-gray-400 flex items-center justify-between min-w-[400px]">
            <input
              type="text"
              placeholder="Vui lòng nhập vào công việc cần kiếm"
              className="flex-1 focus:border-none focus:outline-none"
              onChange={handleChange}
              value={valueSearch}
            />
            <button type="submit" className="py-1 px-5 m-1 bg-yellow-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchCourse;
