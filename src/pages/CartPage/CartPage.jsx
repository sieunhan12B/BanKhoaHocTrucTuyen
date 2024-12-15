import React, { useState } from "react";

import { Table, Button, Checkbox } from "antd";

const CartPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "SHINE TORE",
      price: 939000,
      quantity: 1,
      image: "/Image/rimuru.jpg",
    },
    {
      id: 2,
      name: "Túi Chống Sốc Laptop",
      price: 939000,
      quantity: 1,
      image: "/Image/target.png",
    },
    {
      id: 3,
      name: "Quạt Cổ Trang",
      price: 919900,
      quantity: 1,
      image: "/Image/tiktok.png",
    },
    {
      id: 4,
      name: "Biker Fashion",
      price: 919900,
      quantity: 1,
      image: "/Image/premium.png",
    },
  ]);

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const columns = [
    {
      title: "Sản Phẩm",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      render: (text) => <img src={text} alt={text} className="w-10 h-10" />,
    },
    {
      title: "Đơn Giá",
      dataIndex: "price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      render: (text, record) => (
        <div>
          <Button onClick={() => updateQuantity(record.id, false)}>-</Button>
          {text}
          <Button onClick={() => updateQuantity(record.id, true)}>+</Button>
        </div>
      ),
    },
    {
      title: "Số Tiền",
      dataIndex: "total",
      render: (text, record) =>
        `${(record.price * record.quantity).toLocaleString()} VND`,
    },
    {
      title: "Thao Tác",
      render: (text, record) => (
        <Button onClick={() => removeProduct(record.id)}>Xóa</Button>
      ),
    },
  ];

  const data = products.map((product) => ({
    key: product.id,
    image: product.image,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    seller: "Seller Name",
  }));

  return (
    // <div className="container max-w-screen-lg my-0  mx-auto px-4 py-8">
    //   <div className="">
    //     <Table columns={columns} dataSource={data} pagination={false} />
    //     <h2>Tổng Thanh Toán: {totalPrice.toLocaleString()} VND</h2>
    //     <Button type="primary" className="bg-red-500 text-white">
    //       Mua Hàng
    //     </Button>
    //   </div>
    // </div>
    <div className="">xin chào </div>
  );
};

export default CartPage;
