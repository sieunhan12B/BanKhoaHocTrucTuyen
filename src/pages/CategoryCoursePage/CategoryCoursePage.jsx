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
  const { maDanhMuc } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  console.log(maDanhMuc);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourseByCategory(maDanhMuc)
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
  }, [maDanhMuc]);

  useEffect(() => {
    danhMucService.getCategory().then((res) => {
      if (res.data.data.length > 0) {
        res.data.data.map((item) => {
          if (item.maDanhMuc === maDanhMuc) {
            setCategory(item.tenDanhMuc);
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
            <HomeIcon className="w-12 h-12" />
          </Link>
        }
        title2={`>> ${category}`}
      />
      <ListCourses data={courses} loading={loading} />
    </div>
  );
};

export default CategoryCoursePage;
