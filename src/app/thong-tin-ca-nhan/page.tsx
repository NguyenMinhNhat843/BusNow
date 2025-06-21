"use client";

import { userApi } from "@/api/userApi";
import { updateProfile } from "@/redux/slice/authSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function PersonalInfoPage() {
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootState) => state.auth.user);

  // state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState(null as File | null);
  const [userInfo, setUserInfo] = useState({
    firstName: "Đang tải",
    lastName: "Đang tải",
    email: "Đang tải",
    phoneNumber: "Đang tải",
  });

  useEffect(() => {
    if (userRedux) {
      setAvatarPreview(userRedux.avatar || null);
      setUserInfo({
        firstName: userRedux.firstName || "Chưa cập nhật",
        lastName: userRedux.lastName || "Chưa cập nhật",
        email: userRedux.email || "Chưa cập nhật",
        phoneNumber: userRedux.phoneNumber || "Chưa cập nhật",
      });
    }
  }, [userRedux]);

  const selectAvatarRef = useRef(null as HTMLInputElement | null);
  console.log("userRedux", userRedux);

  // handle
  const handleOpenFolder = () => {
    if (selectAvatarRef.current) {
      selectAvatarRef.current.value = ""; // Reset the input value to allow re-uploading the same file
      selectAvatarRef.current.click();
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      // Tạo URL để xem trước ảnh
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async () => {
    const formDataSubmit = new FormData();
    if (avatarFile) {
      formDataSubmit.append("avatar", avatarFile);
    }

    try {
      const response = await userApi.updateProfileMe(formDataSubmit);
      dispatch(
        updateProfile({
          user: { ...userInfo, avatar: avatarPreview as string },
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userInfo, avatar: avatarPreview as string })
      );
      toast.success("Cập nhật thành công");
      setAvatarPreview(null);
    } catch (error: any) {
      toast.error("Cập nhật thất bại: ", error.message || "Có lỗi xảy ra");
    }
  };

  if (!userRedux) {
    return (
      <div className="w-[500px] mx-auto p-8 rounded-md shadow-lg bg-white mt-8">
        <p className="text-center text-red-500">Bạn chưa đăng nhập</p>
      </div>
    );
  }

  return (
    <div className="w-[500px] mx-auto p-8 rounded-md shadow-lg bg-white mt-8">
      <div>
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full">
            <Image
              src={avatarPreview || "/avatar_default.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={selectAvatarRef}
            onChange={handleChangeFile}
          />
          <button
            className="py-2 px-4 rounded-md bg-blue-400 mt-2 hover:bg-blue-500 cursor-pointer"
            onClick={handleOpenFolder}
          >
            Chọn avatar
          </button>
        </div>
        <div className="flex justify-between gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[100px]">Họ và tên</label>
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
        <div className="flex justify-between gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[100px]">Email</label>
          <p>{userInfo.email}</p>
        </div>
        <div className="flex justify-between gap-6 items-center mt-4">
          <label className="font-bold text-black/80 w-[100px]">
            Số điện thoại
          </label>
          <p>{userInfo.phoneNumber}</p>
        </div>
        <div className="flex justify-center items-center pt-8 ">
          <button
            className="bg-yellow-400 rounded-md px-4 py-2 hover:bg-yellow-500 cursor-pointer"
            onClick={handleSubmit}
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
}
