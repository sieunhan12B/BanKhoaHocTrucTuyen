import React from "react";
import Banner from "../../components/Banner/Banner";
const ContactPage = () => {
  return (
    <div>
      <Banner
        className={"bg-[url('/Image/banner.png')]"}
        title1={"Liên hệ"}
        title2="với chúng tôi"
        content1={`Bạn có thắc mắc, gợi ý, hoặc tìm hiểu giải pháp thông minh?`}
        content2={`Liên hệ với chúng tôi!`}
      />
    </div>
  );
};

export default ContactPage;
