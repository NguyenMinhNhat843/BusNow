"use client";
import { authApi } from "@/api/authApi";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Nguyễn Thị",
    lastName: "Chí Phèo",
    email: "minhnhat8843@gmail.com",
    password: "Pass@123",
    confirmPassword: "Pass@123",
  });

  const onChangeInput = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;
    setIsLoading(true);
    try {
      const response = await authApi.sendOtpRegister(email);
      if (response) {
        toast.success(
          "Đã gửi mã OTP đến email của bạn. Vui lòng kiểm tra hộp thư."
        );
        setIsOtpForm(true);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại sau."
      );
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setIsOtpForm(false);
    setIsLoading(true);
    try {
      const data = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        otp: otp,
      };
      await authApi.register(data);
      toast.success("Đăng ký thành công!");
      router.push("/dang-nhap");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Xác thực OTP thất bại. Vui lòng thử lại."
      );
    }
    setIsLoading(false);
  };

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  const handleNaviagteHome = () => {
    router.push("/");
  };
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
        <h1 className="text-2xl font-bold text-center pb-6">
          Đăng ký tài khoản
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="">
            <label className="font-bold text-gray-700">Họ và tên đệm</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChangeInput}
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập họ và tên đệm"
              required
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
              required
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
              required
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
              required
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
              required
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
            Bạn chưa muốn tạo tài khoản?{" "}
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
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
        </div>
      )}
      {isOtpForm && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-center items-center p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[500px]">
            <p>Nhập OTP được gửi qua gmail</p>
            <form>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
                placeholder="Nhập mã OTP"
                required
              />
              <button
                className="w-full py-2 bg-yellow-400 rounded-lg my-4 cursor-pointer hover:bg-yellow-500"
                onClick={handleVerifyOtp}
              >
                Xác nhận OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
