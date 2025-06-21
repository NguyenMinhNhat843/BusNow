import { login } from "@/redux/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserInitialize() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(
        login({
          user: JSON.parse(storedUser),
        })
      );
    }
  });
  return null;
}
