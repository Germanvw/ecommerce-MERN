import { Outlet } from "react-router-dom";

import "./styles.scss";

export const Admin = () => {
  return (
    <>
      <div>Admin</div>
      <Outlet />
    </>
  );
};
