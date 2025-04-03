import React, { useEffect, useState, useContext } from "react";
import { Table, Space } from "antd";
import { danhMucService } from "../../services/danhMuc.service";
import { NotificationContext } from "../../App";
import FormAddCategory from "../../components/FormAddItem/FormAddCategory";
import FormSearchCategory from "../../components/FormSearchProduct/FormSearchProduct";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";
const ManagerCategory = () => {
  const [categories, setCategories] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    danhMucService
      .getCategory()
      .then((res) => {
        showNotification("Lấy dữ liệu danh mục thành công", "success");
        setCategories(res.data);
        setFilteredCategories(res.data);
      })
      .catch((err) => {
        showNotification("Lấy dữ liệu danh mục thất bại", "error");
      });
  }, []);

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_, __, index) => (
        <span>{(currentPage - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: "Mã danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {  
              danhMucService
                .deleteCategory(record.categoryId)
                .then((res) => {
                  console.log(res);
                  showNotification("Xóa danh mục thành công", "success");
                  onFinish();
                })
                .catch((err) => {
                  console.log(err);
                  showNotification(err.response.data.message, "error");
                });
            }}
            className="bg-red-500/85 text-white py-2 px-5"
          >
            Xoá
          </button>
          <button
            className="bg-yellow-500/85 text-white py-2 px-5"
            onClick={() => {
              showModal(record);
            }}
          >
            Sửa
          </button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const showModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const onFinish = () => {
    danhMucService
      .getCategory()
      .then((res) => {
        console.log(res);
        setCategories(res.data);
        setFilteredCategories(res.data);
        showNotification("Dữ liệu đã được cập nhật", "success");
      })
      .catch((err) => {
        console.log("Error fetching updated data:", err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (term) => {
    const filtered = categories.filter((category) => {
      const normalizedName = removeVietnameseTones(category.categoryName)
        .toLowerCase()
        .trim();
      return normalizedName.includes(term);
    });
    setFilteredCategories(filtered);
  };

  return (
    <div>
      <div className="mb-4  flex justify-between items-center">
        <FormSearchCategory
          title="Tìm kiếm danh mục..."
          onSearch={handleSearch}
          className="mx-0"
        />
        <button
          onClick={() => showModal()}
          className="bg-yellow-500/85 font-semibold rounded-md py-3 px-5"
        >
          Thêm danh mục
        </button>
      </div>

      <FormAddCategory
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        categoryData={selectedCategory}
        onFinish={onFinish}
      />

      <Table
        columns={columns}
        dataSource={filteredCategories}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredCategories.length,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManagerCategory;
