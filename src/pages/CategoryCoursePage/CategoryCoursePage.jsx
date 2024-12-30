import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { khoaHocService } from "../../services/khoaHoc.service";
import { useState } from "react";
import Banner from "../../components/Banner/Banner";
import HomeIcon from "../../components/Icons/HomeIcon";
import { Link } from "react-router-dom";
import ListCourses from "../../components/ListCourses/ListCourses";
import { danhMucService } from "../../services/danhMuc.service";
const CategoryCoursePage = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  console.log(categoryId);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourseByCategory(categoryId)
      .then((res) => {
        console.log(res);
        setCourses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  useEffect(() => {
    danhMucService.getCategory().then((res) => {
      if (res.data.data.length > 0) {
        res.data.data.map((item) => {
          if (item.categoryId === categoryId) {
            setCategory(item.categoryName);
          }
        });
      }
    });
  }, [courses]);

  return (
    <div>
      <Banner
        className="bg-[url('/Image/bannercontact.jpg')]"
        title1={
          <Link to="/" className="hover:text-primary">
            <i className="text-white fa-solid fa-house"></i>
          </Link>
        }
        title2={`>> ${category}`}
        classNameTitle="text-white"
      />
      <ListCourses data={courses} loading={loading} />
    </div>
  );
};

export default CategoryCoursePage;
