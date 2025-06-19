"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
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
            <label className="font-bold text-gray-700">Họ và tên đệm</label>
            <input
              type="text"
              name="fristName"
              value={formData.firstName}
              onChange={onChangeInput}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập họ và tên đệm"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Tên</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onChangeInput}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập tên"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeInput}
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
              onChange={onChangeInput}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeInput}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button className="w-full py-2 bg-yellow-400 rounded-lg my-4 cursor-pointer hover:bg-yellow-500">
            Đăng ký tài khoản
          </button>

          <p className="text-center pt-2">
            Bạn đã có tài khoản?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={handleNaviagteLogin}
            >
              Đăng nhập ngay
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
    </div>
  );
}
