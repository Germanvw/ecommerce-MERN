import { AppRouter } from "./Components/router/AppRouter";
import { store } from "./Components/redux/storage";
import { Provider } from "react-redux";

import "./styles/styles.scss";

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
