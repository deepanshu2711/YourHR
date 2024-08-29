import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/userProvider";

export const Privateroute = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};
