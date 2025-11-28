import { role } from "@fixlance/core";
import api from "../config/api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: role;
}

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
};
