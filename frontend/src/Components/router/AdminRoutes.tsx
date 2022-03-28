import { Outlet, Navigate } from "react-router-dom";
import { uidProps } from "./routes";

export const AdminRoutes = ({ isAdmin }: uidProps) => {
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
