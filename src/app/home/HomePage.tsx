"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleDot,
  faLocationDot,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { ForwardedRef } from "react";
import locations from "../../data/location";
import RoutePopulateItem from "@/component/RoutePopulateItem";

const vehicle = [
  {
    id: 1,
    name: "Xe khách",
    // icon:
  },
  {
    id: 2,
    name: "Máy bay",
    // icon:
  },
  {
    id: 3,
    name: "Tàu hỏa",
    // icon:
  },
  {
    id: 4,
    name: "Thuê xe",
    // icon:
  },
];

// Component tuỳ biến hiển thị ngày
const CustomDateInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => (
  <button
    type="button"
    className="text-left text-base"
    onClick={onClick}
    ref={ref}
  >
    {value || "Chọn ngày"}
  </button>
));

// ✅ Thêm displayName để tránh warning của ESLint
CustomDateInput.displayName = "CustomDateInput";

export default function HomePage() {
  const [vehicleTab, setVehicleTab] = useState("Xe khách");
  const [locationSelected, setLocationSelected] = useState({
    from: "Sài Gòn",
    to: "Nha Trang",
  });
  const [isOpenMenuLocationFrom, setIsOpenMenuLocationFrom] = useState(false);
  const [isOpenMenuLocationTo, setIsOpenMenuLocationTo] = useState(false);
  const menuLocationFromRef = useRef<HTMLDivElement>(null);
  const menuLocationToRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState(new Date());

  // handle select location
  const handleSeletLocationFrom = (location: any) => {
    setLocationSelected((prev) => ({ ...prev, from: location.name }));
    setIsOpenMenuLocationFrom(false); // close menu after selecting
  };

  // handle select location
  const handleSeletLocationTo = (location: any) => {
    setLocationSelected((prev) => ({ ...prev, to: location.name }));
    setIsOpenMenuLocationTo(false); // close menu after selecting
  };

  // handle swap location
  const handleSwapLocation = () => {
    setLocationSelected((prev) => ({ from: prev.to, to: prev.from }));
  };

  // handle cick outside to close menu location - location from
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuLocationFromRef.current &&
        !menuLocationFromRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenuLocationFrom(false);
      }
    };

    // add listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle cick outside to close menu location - location to
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuLocationToRef.current &&
        !menuLocationToRef.current.contains(event.target as Node)
      ) {
        setIsOpenMenuLocationTo(false);
      }
    };

    // add listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="select-none">
      {/* SearchBar */}
      <div className="relative h-[400px]">
        <div className="absolute w-full h-full">
          <Image
            src="/bg_searchbar.jpg"
            alt="Backgorund searchbar"
            fill
            style={{ objectFit: "cover" }}
            priority // nếu bạn muốn load ảnh ngay lập tức (ví dụ background trang chính)
          />
        </div>

        {/* Overlay */}
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black/50">
          <h1 className="text-white text-2xl pb-4">
            Đặt vé dễ dàng - nhanh chóng - tiện lợi
          </h1>
          <form
            action=""
            className="bg-white rounded-2xl shadow-lg px-4 py-4 max-w-5xl w-full mx-auto"
          >
            {/* Tab vehicle */}
            <div className="flex justify-center items-center gap-6 pb-4">
              {vehicle.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      item.name === vehicleTab
                        ? "font-bold border-b-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setVehicleTab(item.name)}
                  >
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
            {/* end: Tab vehicle */}

            <div className="flex items-center justify-between gap-4">
              <div className="relative flex justify-between gap-4 grow border border-slate-300 rounded-2xl p-2">
                {/* Nơi đi */}
                <div
                  className="relative flex items-center gap-4 min-w-[140px]"
                  ref={menuLocationFromRef}
                >
                  <FontAwesomeIcon
                    icon={faCircleDot}
                    className="text-3xl text-blue-600"
                  />
                  <div
                    className="cursor-pointer select-none"
                    onClick={() =>
                      setIsOpenMenuLocationFrom(!isOpenMenuLocationFrom)
                    }
                  >
                    <p className="text-sm text-slate-500">Nơi xuất phát</p>
                    <p>{locationSelected.from}</p>
                  </div>

                  {/* menu location */}
                  {isOpenMenuLocationFrom && (
                    <div className="absolute top-20 -left-1 w-[240px] bg-white shadow-lg rounded-lg py-4">
                      <ul>
                        {locations.map((item: any) => (
                          <li
                            key={item.id}
                            className="py-2 px-4 cursor-pointer hover:bg-slate-100 "
                            onClick={() => handleSeletLocationFrom(item)}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* swap button */}
                <div
                  className="flex justify-center items-center bg-slate-300 rounded-full w-10 h-10 cursor-pointer"
                  onClick={() => handleSwapLocation()}
                >
                  <FontAwesomeIcon icon={faRightLeft} />
                </div>

                {/* Nơi đến */}
                <div
                  className="relative flex items-center gap-4 min-w-[140px]"
                  onClick={() => setIsOpenMenuLocationTo(!isOpenMenuLocationTo)}
                  ref={menuLocationToRef}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-3xl text-red-600"
                  />
                  <div className="cursor-pointer select-none">
                    <p className="text-sm text-slate-500">Nơi đến</p>
                    <p>{locationSelected.to}</p>
                  </div>

                  {/* menu location */}
                  {isOpenMenuLocationTo && (
                    <div className="absolute top-20 w-[240px] bg-white shadow-lg rounded-lg py-4">
                      <ul>
                        {locations.map((item: any) => (
                          <li
                            key={item.id}
                            className="py-2 px-4 cursor-pointer hover:bg-slate-100 "
                            onClick={() => handleSeletLocationTo(item)}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* separation */}
                <div className="border-l border-slate-300 h-10"></div>

                {/* Ngày đi */}
                <div className="flex items-center gap-4 min-w-[200px] select-none">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="text-3xl text-blue-600"
                  />
                  <div className="cursor-pointer">
                    <p className="text-sm text-slate-500">Ngày đi</p>
                    <div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date as Date)}
                        locale={vi}
                        dateFormat={"eeee, dd/MM/yyyy"}
                        className="border px-3 py-1 rounded-md"
                        customInput={<CustomDateInput />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút Tìm kiếm */}
              <div className="bg-yellow-500 cursor-pointer text-white  rounded-lg hover:bg-yellow-700 transition-colors">
                <p className="text-xl text-center text-black px-4 py-4 w-[200px] ">
                  Tìm kiếm
                </p>
              </div>
              {/* end */}
            </div>
          </form>
        </div>
      </div>
      {/* end: search bar */}

      {/* Tuyến đường phổ biến */}
      <div className="max-w-5xl mx-auto py-8">
        <p className="text-2xl pb-2">Tuyến đường phổ biến</p>
        <div className="flex justify-between items-center gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <RoutePopulateItem key={index} />
          ))}
        </div>
      </div>
      {/* end: Tuyến đường phổ biến */}
    </main>
  );
}
