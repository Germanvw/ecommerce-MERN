import Swal, { SweetAlertOptions } from "sweetalert2";
import { startCatRemove } from "../redux/actions/categoryActions";
import { startProdRemove } from "../redux/actions/productActions";

export const confirmDeleteCategory = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startCatRemove(_id));
    }
  });
};

export const confirmDeleteProduct = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startProdRemove(_id));
    }
  });
};
