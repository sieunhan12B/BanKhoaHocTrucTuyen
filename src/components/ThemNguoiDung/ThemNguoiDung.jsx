import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import InputCustom from "../Input/InputCustom";
import { Select, Space } from "antd";
import { Formik, useFormik } from "formik";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { getLocalStorage } from "../../utils/utils";
import { NotificationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";

const ThemNguoiDung = () => {
  const { accessToken } = getLocalStorage("user");
  const { showNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Thêm người dùng mới");
  const { listNguoiDung, arrUserFilter, searchTerm } = useSelector(
    (state) => state.nguoiDungSlice
  );
  console.log(listNguoiDung);
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      taikhoan: "",
      matkhau: "",
      hoten: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "gp01",
    },
    onSubmit: (values) => {
      console.log(values);
      nguoiDungService
        .createUSer(values, accessToken)
        .then((res) => {
          console.log(res);
          showNotification("Thêm người dùng mới thành công ", "success");
          dispatch(getValueUserApi());
        })
        .catch((err) => {
          console.log(err);
          showNotification(err.response.data, "error");
        });
    },
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    handleSubmit();

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm người dùng
      </Button>
      <Modal
        title="Thêm Người Dùng Mới"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" onSubmit={handleSubmit}>
          <InputCustom
            labelContent={"Tài khoản"}
            value={values.taikhoan}
            name={"taikhoan"}
            onChange={handleChange}
          />
          <InputCustom
            labelContent={"Mật khẩu"}
            name={"matkhau"}
            value={values.matkhau}
            onChange={handleChange}
          />
          <InputCustom
            labelContent={"Họ tên"}
            name={"hoten"}
            value={values.hoten}
            onChange={handleChange}
          />
          <InputCustom
            labelContent={"Số điện thoại "}
            value={values.soDT}
            onChange={handleChange}
            name={"soDT"}
          />
          <InputCustom
            labelContent={"Email"}
            onChange={handleChange}
            name={"email"}
            value={values.email}
          />
          <Space wrap>
            <Select
              name="loaiNguoiDung"
              value={values.maLoaiNguoiDung}
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              onChange={(value) => setFieldValue("maLoaiNguoiDung", value)}
              options={[
                {
                  value: "HV",
                  label: "Học viên",
                },
                {
                  value: "GV",
                  label: "Giáo vụ",
                },
              ]}
            />
          </Space>
        </form>
      </Modal>
    </>
  );
};

export default ThemNguoiDung;
