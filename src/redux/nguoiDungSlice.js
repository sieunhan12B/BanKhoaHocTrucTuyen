import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, thunkAPI) => {
    const resolve = await nguoiDungService.getListUser();
    console.log(resolve);
    return resolve.data;
    // return "A Khải Vip Pro";
  }
);

const initialState = {
  listNguoiDung: [],
  arrFilterUser: [],
  searchTerm: "",
};

const nguoiDungSlice = createSlice(
  {
    name: "nguoiDung",
    initialState,
    reducers: {
      setListUserFilter: (state, action) => {
        state.arrUserFilter = action.payload;
      },
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getValueUserApi.fulfilled, (state, action) => {
        console.log(action);
        state.listNguoiDung = action.payload;
      });
    },
  }
  // extraReducers: (builder) => {
  //   builder.addCase(getValueUserApi.fulfilled, (state, action) => {
  //     console.log(action);
  //     state.listNguoiDung = action.payload;
  //   });
  //   // builder.addCase(getValueUserApi.rejected, (state, action) => {
  //   //   console.log(action);
  //   // });
  //   // builder.addCase(getValueUserApi.pending, (state, action) => {
  //   //   console.log(action);
  //   // });
  // },
);

export const { setListUserFilter, setSearchTerm } = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
