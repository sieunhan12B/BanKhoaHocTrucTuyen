import React from "react";

const Banner = ({
  className,
  title1 = "",
  title2 = "",
  content1 = "",
  content2 = "",
}) => {
  return (
    <div
      className={`w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center bg-no-repeat ${className}`}
    >
      <div className="flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center flex flex-wrap items-center gap-2 md:gap-3 justify-center">
          <span className="text-yellow-500 italic font-playfair">{title1}</span>
          <span>{title2}</span>
        </h1>
        <p className="banner-content text-center text-base md:text-lg lg:text-xl font-semibold mt-2 md:mt-4">
          {content1} <br /> {content2}
        </p>
      </div>
    </div>
  );
};

export default Banner;
