import { useSelector, useDispatch } from "react-redux";
import { uiSwapTheme } from "../../redux/actions/uiActions";
import { RootState } from "../../redux/reducer/rootReducer";

export const SwitchThemeButton = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(uiSwapTheme());
  };
  return (
    <button className="btn-switch" onClick={handleSwitch}>
      {darkMode ? (
        <i className="fa-solid fa-sun"></i>
      ) : (
        <i className="fa-solid fa-moon"></i>
      )}
    </button>
  );
};
