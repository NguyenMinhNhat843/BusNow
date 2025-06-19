"use client";

import logo from "../../../public/logo.webp";
import avatarDefault from "../../public/avatar_default.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tabMenuUser = [
  {
    name: "Thông tin cá nhân",
    link: "/user/profile",
  },
  {
    name: "Đổi mật khẩu",
    link: "/user/change-password",
  },
  {
    name: "Đăng xuất",
    link: "/logout",
  },
];

export default function Header() {
  const router = useRouter();
  const [isOpenMenuUser, setIsOpenMenuUser] = useState(false);

  const handleNaviagteLogin = () => {
    router.push("/dang-nhap");
  };

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
          <button
            className="bg-yellow-400 rounded-lg py-2 px-4 cursor-pointer hover:bg-yellow-500"
            onClick={handleNaviagteLogin}
          >
            Đăng nhập
          </button>
        </div>
        {/* <div
          className="relative h-full flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => setIsOpenMenuUser(!isOpenMenuUser)}
        >
          <div className="relative h-[32px] aspect-square rounded-full">
            <Image
              src={avatarDefault}
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
                  <li key={index} className="p-2 hover:bg-slate-100">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
