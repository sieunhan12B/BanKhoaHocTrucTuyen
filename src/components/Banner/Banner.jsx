import React from "react";

const Banner = ({
  className,
  title1 = "",
  title2 = "",
  content1 = "",
  content2 = "",
}) => {
  return (
    <div className={`w-full h-[60vh] bg-cover bg-center ${className}`}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl font-semibold text-center flex items-center gap-3 justify-center">
          <span className="text-yellow-500 italic font-playfair">{title1}</span>
          <span className=""> {title2}</span>
        </h1>
        <p className="banner-content text-center  text-xl font-semibold mt-4">
          {content1} <br /> {content2}
        </p>
      </div>
    </div>
  );
};

export default Banner;
