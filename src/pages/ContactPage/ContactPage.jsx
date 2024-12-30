import React from "react";
import Banner from "../../components/Banner/Banner";
import { Image } from "antd";
import InputCustom from "../../components/Input/InputCustom";

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

      {/* Liên hệ với tôi  */}
      <div className="container mx-auto my-8">
        <div className="flex justify-center items-center mx-10 max-[1024px]:block max-[1024px]:text-center">
          <div className="w-1/2 max-[1024px]:w-full">
            <Image
              preview={false}
              height={750}
              className=" w-full rounded-md transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px]"
              src="./Image/yenbinh.jpg"
            />
          </div>
          <div className="w-1/2 p-10 max-[1024px]:w-full shadow-2xl rounded-lg space-y-4 relative max-[1024px]:right-0 right-20 z-10 bg-white">
            <h2 className="text-5xl font-semibold ">Liên hệ với Yến Bình </h2>
            <form className="space-y-4" action="">
              <InputCustom
                classNameInput="bg-gray-100 border-transparent p-4 font-semibold text-xl"
                placeholder={"Enter your name"}
              />
              <InputCustom
                classNameInput="bg-gray-100 border-transparent p-4 font-semibold text-xl"
                placeholder={"Enter your mail"}
              />
              <InputCustom
                classNameInput="bg-gray-100 border-transparent p-4 font-semibold text-xl"
                placeholder={"Enter your Subject"}
              />
              <InputCustom
                classNameInput="bg-gray-100 border-transparent p-4  font-semibold text-xl"
                placeholder={"Enter your message"}
              />
              <div className="text-right">
                <button className="px-16 py-4 text-xl font-bold   rounded-lg bg-yellow-500">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div className=" bg-gray-100 py-10">
        <div className="title space-y-4 text-center">
          <p className="text-yellow-600 font-semibold text-xl">
            {" "}
            Liên lạc với chúng tôi{" "}
          </p>
          <h2 className="font-bold text-5xl">Chúng tôi ở đây để giúp đỡ</h2>
          <p className="opacity-50">
            Kết nối với chúng tôi ngay hôm nay và cùng tạo nên điều kỳ diệu!
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between h-auto m-5 container mx-auto px-4 lg:px-8 xl:px-20 max-w-[1400px] py-8">
          {contactInfo.map(({ icon, title, content }, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 mx-2 p-5 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:translate-y-[-10px] mb-4 md:mb-0 rounded-2xl"
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

      {/* Bản đồ */}
      <div className="container mx-auto my-8">
        <div className="w-full h-[400px]">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8969994518144!2d106.81043691533557!3d20.99516238602145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aefab545a3b9%3A0x9e9290c7cf771f2c!2zTGFuZyB2xqFuaCDEkOG6p2jDoW5nLCBUaGFuIE5hbSDEkOG6p2jDoW5nIFNoaXR0IFRvdWFsIFRoZSBMaWtl!5e0!3m2!1svi!2s!4v1615852136375!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
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
