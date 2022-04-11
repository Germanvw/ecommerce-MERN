import Swal from "sweetalert2";
import { uiClearError, uiSetError } from "../redux/actions/uiActions";

export const fireModal = async (
  title: string,
  body: string,
  type: any,
  dispatch: any
) => {
  if (type === "error") {
    await dispatch(uiSetError(body));
    await dispatch(uiClearError());
  } else {
    Swal.fire(title, body, type);
  }
};
