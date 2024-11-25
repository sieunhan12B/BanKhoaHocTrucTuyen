import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import ListCourses from "../../components/ListCourses/ListCourses";
import { khoaHocService } from "../../services/khoaHoc.service";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    khoaHocService
      .getCourse()
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Banner className="bg-[url('/Image/bannersale.jpg')]" />
      <ListCourses data={data} loading={loading} />
    </div>
  );
};

export default HomePage;
