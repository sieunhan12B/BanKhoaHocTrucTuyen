import React from "react";
import Banner from "../../components/Banner/Banner";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Hướng dẫn cách lấy nhạc tiktok làm nhạc chuông trong 3 giây",
      image: "/Image/tiktok.png",
      author: "Edumail",
      date: "01 Tháng 12 2024",
    },
    {
      id: 2,
      title: "Hướng dẫn cài lại mật khẩu trên Edumail",
      image: "/Image/premium.png",
    },
    {
      id: 3,
      title: "Hướng dẫn tách ngày tháng năm trong Excel nhanh chóng",
      image: "/Image/excel.jpg",
    },
    {
      id: 4,
      title: "Các ký hiệu điển trong bản vẽ autocad bạn cần biết",
      image: "/Image/autocad.png",
    },
    {
      id: 5,
      title:
        "Target là gì trong chứng khoán? Sự tác động của Target đến giá biểu",
      image: "/Image/target.png",
    },
    {
      id: 6,
      title:
        "Thiết kế nội thất là gì? Học thiết kế nội thất ở đâu tốt nhất tại thành phố HCM?",
      image: "/Image/hocthietke.png",
    },
    {
      id: 7,
      title: "Hướng dẫn cách tính chỉ số NPV nhanh nhất trong 3 giây",
      image: "/Image/cacchiso.png",
    },
    {
      id: 8,
      title: "Tìm hiểu về giao dịch ký quỹ chứng khoán (MARGIN) là gì?",
      image: "/Image/margin.png",
    },
    {
      id: 9,
      title: "Cách đọc biểu đồ nến forex chuyên nghiệp giúp hạn chế rủi ro",
      image: "/Image/foresx.png",
    },
    {
      id: 10,
      title: "Các cặp tiền chính trong forex dành cho nhà đầu tư mới",
      image: "/Image/broken.png",
    },
    {
      id: 11,
      title:
        "Forex là gì? Đầu tư forex có an toàn không, chia sẻ ngay kinh nghiệm đầu tư",
      image: "/Image/dautu.png",
    },
    {
      id: 12,
      title: "Cách tính lót trong forex để giảm thiểu rủi ro khi đầu tư",
      image: "/Image/khoahoc.png",
    },
    {
      id: 13,
      title: "Cách tính lót trong forex để giảm thiểu rủi ro khi đầu tư",
      image: "/Image/tiktok.png",
    },
  ];

  return (
    <div>
      <Banner
        className={"bg-[url('/Image/banner.png')]"}
        title1={"Bài viết"}
        title2="của chúng tôi"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg overflow-hidden  mx-auto mb-12">
          <div className="flex flex-col md:flex-row-reverse">
            <img
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full md:w-1/2 h-72 object-cover"
            />
            <div className="p-6 md:w-1/2">
              <div className="flex items-center text-gray-600 text-sm mb-3">
                <span>{blogPosts[0].author}</span>
                <span className="mx-2">•</span>
                <span>{blogPosts[0].date}</span>
              </div>
              <h3 className="text-2xl font-semibold hover:text-blue-600 cursor-pointer">
                {blogPosts[0].title}
              </h3>
              <p className="text-gray-600 mt-4">
                Nếu bạn chưa biết cách sử dụng nhạc tiktok làm nhạc chuông, đừng
                ngại bài viết này của Edumail sẽ thực hiện nhé!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                {post.author && post.date && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
