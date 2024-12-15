import UseRoutesCustom from "./hooks/UseRoutesCustom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
// import initDatabase from "./services/config.js";

export const NotificationContext = React.createContext();
import { setLocalStorage } from "./utils/utils";

// Khởi tạo database khi app khởi động
// initDatabase();

function App() {
  setLocalStorage(
    "tokenCyberSoft",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDQiLCJIZXRIYW5TdHJpbmciOiIwMy8wNC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NDM2Mzg0MDAwMDAiLCJuYmYiOjE3MjUwMzcyMDAsImV4cCI6MTc0Mzc4NjAwMH0.N5sVjCi7aBpELt6vYeQ04gMIVjBTB81CWtl80LZnBwU"
  );
  const showNotification = (content, type, duration = 4000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const routes = UseRoutesCustom();
  return (
    <>
      <NotificationContext.Provider
        value={{
          showNotification: showNotification,
        }}
      >
        <ToastContainer />
        {routes}
      </NotificationContext.Provider>
    </>
  );
}

export default App;
