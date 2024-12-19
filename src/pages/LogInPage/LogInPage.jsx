import React, { useContext } from "react";

import InputCustom from "../../components/Input/InputCustom";
import { Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/utils";

const LogInPage = () => {
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  // Khởi tạo formik
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      validationSchema: yup.object({
        taiKhoan: yup.string().required("Tài khoản không được để trống"),
        matKhau: yup.string().required("Mật khẩu không được để trống"),
      }),
      onSubmit: (values) => {
        console.log(values);
        // Xử lý logic đăng ký ở đây
        authService
          .logIn(values)
          .then((res) => {
            console.log(res.data);
            setLocalStorage("user", res.data.data);
            showNotification("Đăng nhập thành công", "success");
            setTimeout(() => {
              navigate(path.homePage);
            }, 1000);
          })
          .catch((err) => {
            showNotification(err.response.data.message, "error");
          });
      },
    });
  return (
    <div className="form-login flex h-screen flex-col md:flex-row">
      {/* Phần form đăng nhập */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative">
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
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputCustom
              labelContent="Tài khoản"
              placeholder="Nhập tài khoản của bạn"
              typeInput="text"
              name="taiKhoan"
              value={values.taiKhoan}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
            />
            <InputCustom
              labelContent="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              typeInput="password"
              name="matKhau"
              value={values.matKhau}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
            />
            {/* Thêm link quên mật khẩu */}
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm ">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Đăng nhập
            </button>
            <div className="text-center space-x-2 mt-2">
              <span>Bạn chưa có tài khoản ?</span>
              <Link className="font-bold" to={path.signUp}>
                Đăng kí
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Phần background */}
      <div className="hidden md:block w-full md:w-1/2 h-[200px] md:h-auto bg-[url('/Image/bgSigninSignup.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Bạn có thể thêm hình ảnh hoặc nội dung khác ở đây */}
      </div>
    </div>
  );
};

export default LogInPage;
