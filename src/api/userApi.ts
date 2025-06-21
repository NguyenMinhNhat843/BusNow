import axiosInstance from "./axiosInstance";

export const userApi = {
  getProfileMe: async () => {
    const response = await axiosInstance.get("user/getProfileMe");
    return response.data;
  },

  updateProfileMe: async (formData: FormData) => {
    const response = await axiosInstance.put("user/updateProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
