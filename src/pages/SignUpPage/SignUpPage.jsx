import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputCustom from "../../components/Input/InputCustom";
import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      xacNhanMatKhau: "",
      hoTen: "",
      email: "",
      sdt: "",
    },
    validationSchema: Yup.object({
      // regex
      taiKhoan: Yup.string()
        .required("Tài khoản không được để trống")
        .matches(/^\S*$/, "Tài khoản không được có khoảng cách"),
      matKhau: Yup.string().required("Mật khẩu không được để trống"),
      xacNhanMatKhau: Yup.string()
        .required("Mật khẩu không được để trống")
        .oneOf([Yup.ref("matKhau"), null], "Mật khẩu không khớp"),
      hoTen: Yup.string().required("Họ tên không được để trống"),
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Email không được để trống"),
      sdt: Yup.string().required("Số điện thoại không được để trống"),
    }),
    onSubmit: (values) => {
      authService
        .signUp(values)
        .then((res) => {
          console.log(res);
          showNotification("Đăng ký thành công", "success");
          setTimeout(() => {
            navigate(path.logIn);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          showNotification("Đăng ký thất bại", "error");
        });
    },
  });
  const { showNotification } = useContext(NotificationContext);
  return (
    <div className="form-signup flex min-h-screen flex-col md:flex-row overflow-auto">
      <div className="w-full md:w-1/2 flex items-center justify-center relative py-4 md:py-8">
        {/* Logo */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Link to={path.homePage}>
            <Image
              src="/Image/logo2.jpeg"
              alt="Logo"
              width={60}
              className="w-24 md:w-32 lg:w-40"
              preview={false}
            />
          </Link>
        </div>

        <div className="w-full max-w-[500px] p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputCustom
              labelContent="Tài khoản"
              placeholder="Nhập tài khoản của bạn"
              typeInput="text"
              name="taiKhoan"
              onChange={handleChange}
              value={values.taiKhoan}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
            />

            <InputCustom
              labelContent="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              typeInput="password"
              name="matKhau"
              onChange={handleChange}
              value={values.matKhau}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
            />
            <InputCustom
              labelContent="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu của bạn"
              typeInput="password"
              name="xacNhanMatKhau"
              onChange={handleChange}
              value={values.xacNhanMatKhau}
              onBlur={handleBlur}
              error={errors.xacNhanMatKhau}
              touched={touched.xacNhanMatKhau}
            />
            <InputCustom
              labelContent="Họ tên"
              placeholder="Nhập họ tên của bạn"
              name="hoTen"
              onChange={handleChange}
              value={values.hoTen}
              onBlur={handleBlur}
              error={errors.hoTen}
              touched={touched.hoTen}
            />
            <InputCustom
              labelContent="Email"
              placeholder="Nhập email của bạn"
              typeInput="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
            />
            <InputCustom
              labelContent="Số điện thoại"
              placeholder="Nhập số điện thoại của bạn"
              typeInput="tel"
              name="sdt"
              onChange={handleChange}
              value={values.sdt}
              onBlur={handleBlur}
              error={errors.sdt}
              touched={touched.sdt}
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Đăng ký
            </button>
            <div className="text-center space-x-2 mt-2">
              <span>Bạn đã có tài khoản ?</span>
              <Link className="font-bold" to={path.logIn}>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Phần background */}
      <div className="hidden md:block w-full md:w-1/2 bg-[url('/Image/bgSigninSignup.jpg')] bg-cover bg-center bg-no-repeat md:fixed md:right-0 md:h-full"></div>
    </div>
  );
};

export default SignUpPage;
