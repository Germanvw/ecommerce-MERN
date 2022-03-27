import { Outlet, Navigate } from "react-router-dom";
import { uidProps } from "./routes";

export const PrivateRoutes = ({ isAuth }: uidProps) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
