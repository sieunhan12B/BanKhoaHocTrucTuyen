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
import ManagerCourse from "../pages/ManagerCourse/ManagerCourse";
import MyCoursePageTeach from "../pages/MyCoursePageTeach/MyCoursePageTeach";
import CartPage from "../pages/CartPage/CartPage";
import ManagerCategory from "../pages/ManagerCategory/ManagerCategory";
import { getLocalStorage } from "../utils/utils";

const UseRoutesCustom = () => {
  const user = getLocalStorage("user");
  const isAuthorized = (role) => {
    if (user && role.includes(user.role)) {
      return true;
    }
    return false;
  };

  const routes = useRoutes([
    {
      path: path.homePage,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: path.myLearning,
          element: <MyLearningPage />,
        },
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
        {
          path: path.cart,
          element: <CartPage />,
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
      element: isAuthorized("HV") ? <StudentTemplate /> : <ErrorPage />,
      children: [
        {
          path: path.myAccount,
          element: isAuthorized("HV") ? <MyAccountPage /> : <ErrorPage />,
        },
        {
          path: path.myLearning,
          element: isAuthorized("HV") ? <MyLearningPage /> : <ErrorPage />,
        },
      ],
    },
    {
      path: path.teacher,
      element: isAuthorized("GV") ? <TeacherTemplate /> : <ErrorPage />,
      children: [
        {
          path: path.myCourse,
          element: isAuthorized("GV") ? <MyCoursePageTeach /> : <ErrorPage />,
        },
        {
          path: path.myAccount,
          element: isAuthorized("GV") ? <MyAccountPage /> : <ErrorPage />,
        },
      ],
    },
    {
      path: path.admin,
      element: isAuthorized("admin") ? <AdminTemplate /> : <ErrorPage />,
      children: [
        {
          path: path.managerUser,
          element: isAuthorized("admin") ? <ManagerUser /> : <ErrorPage />,
        },
        {
          path: path.managerCourse,
          element: isAuthorized("admin") ? <ManagerCourse /> : <ErrorPage />,
        },
        {
          path: path.managerCategory,
          element: isAuthorized("admin") ? <ManagerCategory /> : <ErrorPage />,
        },
      ],
    },
  ]);
  return routes;
};

export default UseRoutesCustom;
