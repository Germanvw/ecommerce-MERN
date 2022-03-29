import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/rootReducer";
import { useEffect } from "react";
// Tipos de rutas
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";
// Rutas dinamicas
import { publicRoutes, authRoutes, unAuthRoutes, adminRoutes } from "./routes";
import { startAuthCheck } from "../redux/actions/authActions";

import Swal from "sweetalert2";
import "../../styles/index.scss";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { isAuth, isAdmin, checking, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { darkMode, errorMsg } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(startAuthCheck());
  }, [dispatch]);

  useEffect(() => {
    if (errorMsg) {
      Swal.fire("Error", errorMsg, "error");
    }
  }, [errorMsg]);

  if (checking | loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app" theme-color={darkMode ? "dark" : "light"}>
        <Routes>
          <Route element={<PrivateRoutes isAuth={isAuth} />}>
            {authRoutes.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route element={<PublicRoutes isAuth={isAuth} />}>
            {unAuthRoutes.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route element={<AdminRoutes isAdmin={isAdmin} />}>
            {adminRoutes.map(({ Component, path }: any) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          {publicRoutes.map(({ Component, path }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
