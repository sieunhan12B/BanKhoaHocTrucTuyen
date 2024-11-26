import React from "react";
import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomePage from "../pages/HomePage/HomePage";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import BlogPage from "../pages/BlogPage/BlogPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import CategoryCoursePage from "../pages/CategoryCoursePage/CategoryCoursePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import StudentTemplate from "../templates/StudentTemplate/StudentTemplate";
import MyAccountPage from "../pages/MyAccountPage/MyAccountPage";
import MyLearningPage from "../pages/MyLearningPage/MyLearningPage";
import CoursesDetail from "../pages/CoursesDetail/CoursesDetail";
import TeacherTemplate from "../templates/TeacherTemplate/TeacherTemplate";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import ManagerUser from "../pages/ManagerUser/ManagerUser";
const UseRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: path.homePage,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        // {
        //   path: path.myLearning,
        //   element: <MyLearningPage />,
        // },
        {
          path: path.blog,
          element: <BlogPage />,
        },
        {
          path: path.contact,
          element: <ContactPage />,
        },
        {
          path: path.category,
          element: <CategoryCoursePage />,
        },
        {
          path: path.coursesDetail,
          element: <CoursesDetail />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: path.logIn,
      element: <LogInPage />,
    },
    {
      path: path.signUp,
      element: <SignUpPage />,
    },
    {
      path: path.student,
      element: <StudentTemplate />,
      children: [
        {
          path: path.myAccount,
          element: <MyAccountPage />,
        },
        {
          path: path.myLearning,
          element: <MyLearningPage />,
        },
        // {
        //   path: path.dashboard,
        //   element: <DashboardPage />,
        // },
      ],
    },
    {
      path: path.teacher,
      element: <TeacherTemplate />,
    },
    {
      path: path.admin,
      element: <AdminTemplate />,
      children: [
        {
          path: path.managerUser,
          element: <ManagerUser />,
        },
      ],
    },
  ]);
  return routes;
};

export default UseRoutesCustom;
