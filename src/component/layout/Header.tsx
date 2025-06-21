"use client";

import logo from "../../../public/logo.webp";
// import avatarDefault from "../../public/avatar_default.png";
import avatarDefault from "../../../public/avatar_default.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slice/authSlice";
import { set } from "date-fns";
import { authApi } from "@/api/authApi";
import { toast } from "sonner";

const tabMenuUser = [
  {
    name: "Thông tin cá nhân",
    link: "/thong-tin-ca-nhan",
  },
  {
    name: "Đổi mật khẩu",
    link: "/user/change-password",
  },
];

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

  // Vì đổi lưu token trong httpOnly cookie nên không cần kiểm tra token trong localStorage nữa
  // Mà phải call api logout phía server để xóa cookie
  const handleLogout = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
      toast.success("Đăng xuất thành công!");
    }
    dispatch(logout());
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white shadow-lg h-[70px]">
      {/* logo */}
      <div className="relative h-full aspect-[3/2] mx-4">
        <Image src={logo} alt="logo" fill className="object-cover" />
      </div>

      {/* menu */}
      <div className="h-[50px] flex items-center justify-between gap-4 p-4">
        <p className="cursor-pointer hover:text-shadow-2xs">Đơn hàng của tôi</p>
        <p className="cursor-pointer">Mở bán vé</p>
        {/* menu user */}
        <div className="flex items-center gap-4">
          {user ? (
            <div>
              <div
                className="relative h-full flex items-center justify-between gap-2 cursor-pointer"
                onClick={() => setIsOpenMenuUser(!isOpenMenuUser)}
              >
                <div className="relative h-[32px] aspect-square rounded-full">
                  <Image
                    // src={avatarDefault}
                    src={"/avatar_default.png"}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <span>Nguyễn Minh Nhật</span>

                {isOpenMenuUser && (
                  <div className="absolute top-[calc(100%+12px)] right-0 rounded-lg bg-white shadow-2xl shadow-black w-[200px] z-50">
                    <ul className="py-4">
                      {tabMenuUser.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-slate-100"
                          onClick={() => {
                            router.push(item.link);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                      <li
                        className="p-2 hover:bg-slate-100"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="bg-yellow-400 rounded-lg py-2 px-4 cursor-pointer hover:bg-yellow-500"
              onClick={handleNaviagteLogin}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
