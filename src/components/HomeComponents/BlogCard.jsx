import { Image } from "antd";
import React from "react";

const BlogCard = () => {
  const blogs = [
    {
      image: "../Image/backend.png",
      date: "9 May,2024",
      category: "New",
      title:
        "Mẫu mới về: Bàn phím cơ tinh tế & thời trang - Hoàn hảo cho bạn làm việc của bạn!",
    },
    {
      image: "/Image/dvlpr-front-end-portfolio-example.jpeg",
      date: "9 March,2030",
      category: "Sáng tạo",
      title:
        "Tùy chỉnh trải nghiệm gõ của bạn lên tầm cao mới - Xây dựng chính bản phím cơ của bạn!",
    },
    {
      image: "../Image/full-stack-devlopment-min.png",
      date: "1 January,1999",
      category: "Về chúng tôi",
      title:
        "BaoKeyBoard, đam mê mang đến cho bạn trải nghiệm gõ phím tốt nhất-Chất lượng nhất!",
    },
  ];

  return (
    <div className="container min-h-[70vh] mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px] py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="relative">
              <Image
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">
                {blog.date}
              </div>
            </div>
            <div className="p-6">
              <span className="inline-block bg-pink-50 text-yellow-500 px-3 py-1 rounded-full text-sm mb-4">
                {blog.category}
              </span>
              <h3 className="text-gray-800 font-medium text-lg mb-4 line-clamp-2">
                {blog.title}
              </h3>
              <a
                href="#"
                className="text-yellow-500 hover:text-yellow-600 inline-flex items-center group"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
