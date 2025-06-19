"use client";

import { authApi } from "@/api/authApi";
import { login } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "minhnhat8843@gmail.com",
    password: "Pass@123",
  });

  const handleOnchange = async (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.login(formData.email, formData.password);
      localStorage.setItem("accessToken", response.accessToken);
      dispatch(login({ user: response.user, token: response.accessToken }));
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
    setIsLoading(false);
  };

  const handleNaviagteRegister = () => {
    router.push("/dang-ky");
  };

  const handleNaviagteHome = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
        <h1 className="text-2xl font-bold text-center pb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="">
            <label className="font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập email"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnchange}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button className="w-full py-2 bg-yellow-400 rounded-lg my-4 cursor-pointer hover:bg-yellow-500">
            Đăng nhập
          </button>

          <p className="text-center pt-2">
            Bạn chưa có tài khoản?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNaviagteRegister}
            >
              Đăng ký ngay
            </span>
          </p>

          <p className="text-center pt-2">
            Bạn chưa muốn tạo tìa khoản?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNaviagteHome}
            >
              Vào trang chính
            </span>
          </p>
        </form>
      </div>
      {isLoading && (
        <div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}
