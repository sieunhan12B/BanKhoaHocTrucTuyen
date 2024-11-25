import React from "react";
import Banner from "../../components/Banner/Banner";
const MyCoursePage = () => {
  return (
    <div>
      <Banner
        className={"bg-[url('/Image/banner.png')]"}
        title1={"Khóa học"}
        title2="của tôi"
        content1={`Khóa học của bạn`}
        content2={`Bạn có thể theo dõi khóa học của mình tại đây`}
      />
    </div>
  );
};

export default MyCoursePage;
