import { BrowserRouter, Routes, Route } from "react-router-dom";
// Publicas
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
// Rutas dinamicas
import { publicRoutes, authRoutes, unAuthRoutes } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/rootReducer";
import { useEffect } from "react";
import { startAuthCheck } from "../redux/actions/authActions";

import "../../styles/index.scss";
import { fireModal } from "../hooks/useModal";
import Swal from "sweetalert2";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state: RootState) => state.auth);

  const { darkMode, errorMsg } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    dispatch(startAuthCheck());
  }, [dispatch]);

  useEffect(() => {
    if (errorMsg) {
      Swal.fire("Error", errorMsg, "error");
    }
  }, [errorMsg]);
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
          {publicRoutes.map(({ Component, path }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
