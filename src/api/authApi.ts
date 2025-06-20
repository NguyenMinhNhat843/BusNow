import axiosInstance from "./axiosInstance";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.get("/auth/login", {
      params: {
        email,
        password,
      },
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  sendOtpRegister: async (email: string) => {
    const response = await axiosInstance.post("/auth/send-otp-register", {
      email,
    });
    return response.data;
  },

  register: async (body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    otp: string;
  }) => {
    const { email, password, firstName, lastName, otp } = body;
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
      otp,
    });
    return response.data;
  },
};
