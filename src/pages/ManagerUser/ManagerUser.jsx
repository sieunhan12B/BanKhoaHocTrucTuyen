import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { Space, Table, Tag } from "antd";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";
import { Link } from "react-router-dom";
import ThemNguoiDung from "../../components/ThemNguoiDung/ThemNguoiDung";
import FormSearchUser from "../../components/Form/FormSearchUser";

const ManagerUser = () => {
  const [listNguoiDung, setListNguoiDung] = useState([]);
  useEffect(() => {
    nguoiDungService
      .getListUser()
      .then((res) => {
        setListNguoiDung(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const { showNotification } = useContext(NotificationContext);
  // const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const { listNguoiDung, arrUserFilter, searchTerm } = useSelector(
  //   (state) => state.nguoiDungSlice
  // );

  // console.log(listNguoiDung);
  // console.log(arrUserFilter);
  // useEffect(() => {
  //   dispatch(getValueUserApi());
  //   console.log(listNguoiDung);
  // }, []);

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    // {
    //   title: "Avatar",
    //   dataIndex: "avatar",
    //   key: "avatar",
    //   render: (text) => {
    //     return <img src={text} className="h-14" />;
    //   },
    // },
    {
      title: "số điện thoại ",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "role",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      render: (text) => (
        <Tag color={text == "HV" ? "cyan-inverse" : "red-inverse"}>{text}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="space-x-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.id)
                .then((res) => {
                  console.log(res);
                  // thực hiện xử lí lấy lại danh sách ng dùng
                  dispatch(getValueUserApi());
                  showNotification("Xoá thành công", "success");
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                });
            }}
            className="bg-red-500/85 text-white py-2 px-5"
          >
            Xoá
          </button>
          <button className="bg-yellow-500/85 text-white py-2 px-5">Sửa</button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    // <div className="">ManagerUser</div>
    <div>
      <div className="mb-4 flex justify-between">
        {/* <ThemNguoiDung /> */}
        {/* <FormSearchUser listNguoiDung={listNguoiDung} /> */}
      </div>
      <Table
        columns={columns}
        dataSource={listNguoiDung}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: listNguoiDung.length,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManagerUser;
