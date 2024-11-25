import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseDetail: {
    maKhoaHoc: "1",
    tenKhoaHoc: "ReactJS",
    hinhAnh: "https://picsum.photos/200/300",
    moTa: "ReactJS là một thư viện JavaScript cho phép xây dựng giao diện người dùng tương tác với các thành phần trên web.",
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
      console.log("state", state.courseDetail);
      console.log("action", action.payload);
    },
  },
});

export const { getCourseDetail } = courseSlice.actions;

export default courseSlice.reducer;
