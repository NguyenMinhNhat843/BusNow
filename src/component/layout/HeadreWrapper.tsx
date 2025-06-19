"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper() {
  const pathName = usePathname();
  const hiddenHeaderRouters = ["/dang-nhap", "/dang-ky"];
  const isHiddenRouter = hiddenHeaderRouters.includes(pathName);

  return <>{!isHiddenRouter && <Header />}</>;
}
