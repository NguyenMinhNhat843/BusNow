"use client"; // Bắt buộc nếu bạn đang dùng App Router (Next.js 13+)

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
