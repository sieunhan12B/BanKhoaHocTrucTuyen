import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { useState } from "react";
import Banner from "../../components/Banner/Banner";
import HomeIcon from "../../components/Icons/HomeIcon";
import { Link } from "react-router-dom";
import ListCourses from "../../components/ListCourses/ListCourses";
const CategoryCoursePage = () => {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(categoryName);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourseByCategory(categoryName)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryName]);
  return (
    <div>
      <Banner
        className="bg-[url('/Image/banner.png')]"
        title1={
          <Link to="/" className="hover:text-primary">
            <HomeIcon className="w-12 h-12" />
          </Link>
        }
        title2={`>> ${categoryName}`}
      />
      <ListCourses data={courses} loading={loading} />
    </div>
  );
};

export default CategoryCoursePage;
