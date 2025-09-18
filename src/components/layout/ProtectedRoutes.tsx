import { useAppDispath, useAppSelector } from "../../redux/hooks";

import { Navigate } from "react-router";

import { logout, useCurrentToken } from "../../redux/auth/authSlice";
import { verifyToken } from "@/utils/Verifytoken";
import type { TUser } from "@/type/types";
import type { ReactNode } from "react";

type Tprotected = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoutes = ({ children, role }: Tprotected) => {
  const token = useAppSelector(useCurrentToken);

  const dispatch = useAppDispath();
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(user);

  if (role != undefined && role != user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
