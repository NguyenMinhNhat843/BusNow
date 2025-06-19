"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
              className="border border-gray-300 rounded-md py-1 px-2 w-full mt-2 mb-4"
              placeholder="Nhập email"
            />
          </div>
          <div className="">
            <label className="font-bold text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
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
    </div>
  );
}
