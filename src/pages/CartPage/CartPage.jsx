import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Image, Typography, Modal } from "antd";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/cartSlice";
import { NotificationContext } from "../../App";
import { khoaHocService } from "../../services/khoaHoc.service";
import { getLocalStorage } from "../../utils/utils";
const { Title } = Typography;

const CartPage = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const user = getLocalStorage("user");
  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      align: "center",
      render: (text) => (
        <Image
          src={`http://localhost:8080/Image/${text}`}
          alt={text}
          width={100}
        />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "courseName",
      align: "center",
    },
    {
      title: "Giá",
      dataIndex: "price",
      align: "center",
      render: (text) =>
        `${text.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}`,
    },
    {
      title: "Thành Tiền",
      dataIndex: "total",
      align: "center",
      render: (text, record) => (
        <span>
          {(record.price * record.quantity).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      align: "center",
      render: (text, record) => (
        <div className="w-full flex justify-center items-center gap-3">
          <Button onClick={() => handleQuantityChange(record.key, -1)}>
            -
          </Button>
          <span>{text}</span>
          <Button onClick={() => handleQuantityChange(record.key, 1)}>+</Button>
        </div>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Button onClick={() => handleRemoveFromCart(record.key)}>Xóa</Button>
      ),
    },
  ];

  const data = cart.map((product) => ({
    key: product.courseId,
    image: product.image,
    courseName: product.courseName,
    price: product.price,
    quantity: product.quantity,
  }));

  const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart({ courseId }));
  };

  const handleQuantityChange = (courseId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[courseId] || 1) + change, 1);
      dispatch(updateQuantity({ courseId, quantity: newQuantity }));
      return { ...prev, [courseId]: newQuantity };
    });
  };

  const handleCancel = () => setIsModalOpen(false);

  const handlePayment = () => setIsModalOpen(true);

  const handlePurchase = () => {
    console.log(user);
    if (data.length === 0) {
      showNotification("Giỏ hàng của bạn trống, không thể thanh toán", "error");
      return;
    }
    if (!selectedPaymentMethod) {
      showNotification("Vui lòng chọn phương thức thanh toán", "error");
      return;
    }
    khoaHocService
      .registerCourse({
        username: user.username,
        listCoursesId: cart.map((item) => {
          console.log(item.courseId);
          return item.courseId;
        }),
      })
      .then((res) => {
        console.log(res);
        showNotification("Thanh toán thành công", "success");
        dispatch(clearCart());
      })
      .catch((err) => {
        console.log(err);
        showNotification("Thanh toán thất bại", "error");
      });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto p-4 h-[70vh] overflow-auto">
        <Title level={2} className="text-center">
          Giỏ Hàng
        </Title>
        {data.length === 0 ? (
          <div className="text-center">
            <h3>Giỏ hàng của bạn trống</h3>
          </div>
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </div>
      <div className="container mx-auto">
        <h2 className="text-lg flex justify-end font-semibold mt-5 mr-4 gap-2">
          Tổng Tiền:{" "}
          <span className="text-red-500">
            {data
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}{" "}
            VND
          </span>
        </h2>
      </div>
      <div className="flex flex-col mx-auto container items-end mt-4 p-4 border-t border-gray-300">
        <button
          type="default"
          className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-semibold text-lg hover:bg-yellow-700 transition duration-200 ml-4 w-full sm:w-auto"
          onClick={handlePayment}
        >
          Tiến Hành Thanh Toán
        </button>
      </div>
      <Modal
        title="Thông Tin Thanh Toán"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <select
              className="border border-gray-700 rounded p-2 mb-2 sm:mb-0"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">Chọn phương thức thanh toán</option>
              <option value="momo">Momo</option>
              <option value="cash">Tiền Mặt</option>
              <option value="bankTransfer">Chuyển Khoản Ngân Hàng</option>
            </select>
            <div className="flex gap-2">
              <button
                key="cancel"
                onClick={handleCancel}
                className="bg-black px-4 py-2 rounded-lg text-yellow-500 font-semibold text-lg hover:bg-yellow-500 hover:text-black transition duration-200"
              >
                Hủy
              </button>
              <button
                key="purchase"
                onClick={handlePurchase}
                className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-semibold text-lg hover:bg-black hover:text-yellow-500 transition duration-200"
              >
                Mua
              </button>
            </div>
          </div>,
        ]}
        width={800}
        className="custom-modal"
      >
        <div className="p-6">
          <ul className="list-disc pl-5 space-y-8 max-h-[300px] overflow-y-auto">
            {data.map((item) => (
              <li
                key={item.key}
                className="mb-6 w-full flex items-center p-2 border-b-2"
              >
                <img
                  src={`http://localhost:8080/Image/${item.image}`}
                  alt={item.name}
                  width={70}
                  className="mr-3 rounded"
                />
                <span className="text-lg">
                  {item.name} - Số lượng: {item.quantity} - Giá:{" "}
                  {(item.price * item.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </li>
            ))}
          </ul>
          <h4 className="font-semibold text-xl mt-4">
            Tổng Tiền:{" "}
            <span className="text-red-500">
              {data
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}{" "}
              VND
            </span>
          </h4>
        </div>
      </Modal>
    </>
  );
};

export default CartPage;
