import Swal from "sweetalert2";
import { uiClearError, uiSetError } from "../redux/actions/uiActions";

export const fireModal = (
  title: string,
  body: string,
  type: any,
  dispatch: any
) => {
  if (type === "error") {
    dispatch(uiSetError(body));
    dispatch(uiClearError());
  } else {
    Swal.fire(title, body, type);
  }
};
