import React, { useState, useEffect, useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { Image } from "antd";
import { getLocalStorage } from "../../utils/utils";
import FormAddItem from "../../components/FormAddItem/FormAddItem";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { NotificationContext } from "../../App";
const MyAccountPage = () => {
  const { showNotification } = useContext(NotificationContext);
  const user = getLocalStorage("user");
  const navigate = useNavigate();
  console.log(user);
  // useEffect(() => {
  //   if (!user) {
  //     console.log("Không tìm thấy thông tin đăng nhập");
  //     return;
  //   }

  //   nguoiDungService
  //     .infoAccount(user.taiKhoan)
  //     .then((res) => {
  //       console.log("Thông tin tài khoản:", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Lỗi khi lấy thông tin:", err);
  //       if (err.response?.status === 401) {
  //         console.log("Token không hợp lệ hoặc đã hết hạn");
  //       }
  //     });
  // }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mappedUserData = {
    ...user,
    soDt: user?.soDT,
  };

  console.log(user.soDT);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    showNotification(
      "Cập nhật người dùng thành công, trở về trang đăng nhập trong vòng 2s nữa",
      "success"
    );
    setTimeout(() => {
      navigate(path.logIn);
    }, 2000);
  };

  return (
    <div className="my-account-page p-3 sm:p-5 mx-auto bg-white rounded-2xl max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="">
          <h1 className="text-xl sm:text-2xl font-bold">Sửa hồ sơ của bạn</h1>
          <p className="text-sm text-gray-500">
            Điều này sẽ được chia sẻ với các học viên khác
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-yellow-500 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
        >
          Chỉnh sửa
        </button>
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={user?.avatar || "/Image/rimuru.jpg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </label>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              //   onChange={handleImageChange}
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-medium">Ảnh hồ sơ</h3>
            <p className="text-sm text-gray-500">
              PNG hoặc JPG có chiều rộng và chiều cao không lớn hơn 800px
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <InputCustom
            labelContent="Email"
            id="email"
            name="email"
            typeInput="email"
            placeholder="example@gmail.com"
            value={user?.email || ""}
            disabled
          />

          <InputCustom
            labelContent="Tài khoản"
            id="username"
            name="username"
            typeInput="text"
            placeholder="Nhập tài khoản của bạn"
            value={user?.taiKhoan || ""}
            disabled
          />
          <InputCustom
            labelContent="Họ tên"
            id="fullname"
            name="fullname"
            placeholder="Nhập họ tên của bạn"
            value={user?.hoTen || ""}
          />

          <InputCustom
            labelContent="Mật khẩu"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={user?.matKhau || ""}
            typeInput="password"
          />

          <InputCustom
            labelContent="Số điện thoại"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={user?.sdt || ""}
          />
          {/* <div className="w-full col-span-1 md:col-span-2">
            <label
              htmlFor="aboutMe"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mô tả
            </label>
            <textarea
              name="aboutMe"
              id="aboutMe"
              placeholder="Mô tả"
              className="border-2 border-gray-300 rounded-md p-2 w-full h-24 sm:h-32"
              value={user?.moTa || ""}
            ></textarea>
          </div> */}
        </div>
      </div>
      <FormAddItem
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        onFinish={handleUpdateSuccess}
        userData={mappedUserData}
      />
    </div>
  );
};

export default MyAccountPage;
