import React, { useEffect, useState } from "react";
import InputCustom from "../Input/InputCustom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeVietnameseTones } from "../../utils/utils";
import {
  getValueUserApi,
  setListUserFilter,
  setSearchTerm,
} from "../../redux/nguoiDungSlice";

const FormSearchUser = ({ listNguoiDung }) => {
  // const { listNguoiDung } = useSelector((state) => state.nguoiDungSlice);
  const dispatch = useDispatch();

  const arrUserFilter = useSelector(
    (state) => state.nguoiDungSlice.arrUserFilter
  );

  useEffect(() => {
    dispatch(getValueUserApi());
  }, [dispatch]);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // useEffect(() => {
  //   setArrClone(listNguoiDung); // Cập nhật arrClone khi listNguoiDung thay đổi
  //   console.log(arrClone);
  // }, [listNguoiDung, arrClone]);

  useEffect(() => {
    console.log(listNguoiDung);
    let newKeyWord = removeVietnameseTones(values.search.toLowerCase().trim());
    dispatch(setSearchTerm(newKeyWord));
    const filteredUsers = listNguoiDung.filter((item) => {
      let newTenUser = removeVietnameseTones(
        item.taiKhoan.toLowerCase().trim()
      );
      let newHoTen = removeVietnameseTones(item.hoTen.toLowerCase().trim());

      return newTenUser.includes(newKeyWord) || newHoTen.includes(newKeyWord);
    });
    console.log(filteredUsers);
    dispatch(setListUserFilter(filteredUsers));
  }, [values.search, listNguoiDung, dispatch]);

  // console.log(arrUserFilter);

  // console.log(arrUserFilter);
  // setArrClone(listNguoiDung);
  return (
    <div>
      <form action="">
        <InputCustom
          typeInput="search"
          placeholder={"Nhập tên tài khoản cần tìm "}
          onChange={handleChange}
          value={values.search}
          name={"search"}
        />
      </form>
    </div>
  );
};

export default FormSearchUser;
