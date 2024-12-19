import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/utils";
import { path } from "../../common/path";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles, ...rest }) => {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  // Kiểm tra xem người dùng có đăng nhập và có vai trò hợp lệ không
  const isAuthorized = user && allowedRoles.includes(user.role);

  return (
    <Route
      {...rest}
      element={isAuthorized ? element : navigate(`${path.homePage}`)}
    />
  );
};

export default PrivateRoute;
