import { http } from "./config";

export const roleService = {
  getRoles: () => {
    return http.get("/QuanLyRole/LayDanhSachRole");
  },
};
