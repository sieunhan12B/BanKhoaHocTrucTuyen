import React from "react";
import Banner from "../../components/Banner/Banner";

const ContactPage = () => {
  return (
    <div className="">
      <Banner
        className="bg-[url('/Image/bannercontac2.jpg')]"
        title1="Liên hệ"
        title2="với chúng tôi"
        content1="Bạn có thắc mắc, gợi ý, hoặc tìm hiểu giải pháp thông minh?"
        content2="Liên hệ với chúng tôi!"
      />
      <div className="flex flex-col md:flex-row justify-between h-auto m-5 container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px] py-8 ">
        {contactInfo.map(({ icon, title, content }, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 mx-2 bg-gray-50 p-5 mb-4 md:mb-0 rounded-2xl"
          >
            <div className="rounded-full bg-yellow-500 w-10 h-10 text-center leading-10">
              <i className={`fa-solid ${icon}`}></i>
            </div>
            <p className="my-2">{title}</p>
            <a href="#" className="text-yellow-500">
              {content}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const contactInfo = [
  {
    icon: "fa-envelope",
    title: "Email",
    content: "trogiup@edumall.vn",
  },
  {
    icon: "fa-location-dot",
    title: "Văn Phòng",
    content:
      "Tầng 6, Tòa nhà Kim Khí Thăng long, Sô 1 Lương Yên, Phường Bạch Đằng, Quận Hai Bà Trưng, Thành phố Hà Nội, Việt Nam",
  },
  {
    icon: "fa-phone",
    title: "Điện thoại",
    content: "0865868256",
  },
];

export default ContactPage;
