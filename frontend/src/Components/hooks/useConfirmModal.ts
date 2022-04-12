import Swal, { SweetAlertOptions } from "sweetalert2";
import { startChangeStateCategory } from "../redux/actions/categoryActions";
import { startOrderCancel } from "../redux/actions/OrderActions";
import { startChangeStateProduct } from "../redux/actions/productActions";
import { startChangeStatusBrand } from "../redux/actions/brandActions";
import { startCartRemove } from "../redux/actions/cartActions";
import { startChangeStateUser } from "../redux/actions/userActions";

export const confirmChangeStateCategory = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Change state?",
    text: "You will be able to revert this",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startChangeStateCategory(_id));
    }
  });
};

export const confirmChangeStateProduct = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Change state?",
    text: "You will be able to revert this",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startChangeStateProduct(_id));
    }
  });
};

export const confirmChangeStateBrand = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Change state?",
    text: "You will be able to revert this",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startChangeStatusBrand(_id));
    }
  });
};

export const confirmCancelOrder = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Cancel order?",
    text: "You will not be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startOrderCancel(_id));
    }
  });
};

export const confirmDeleteProductCart = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Remove item from cart!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startCartRemove(_id));
      return result.isConfirmed;
    }
  });
};

export const confirmChangeStatusUser = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Change state?",
    text: "You will be able to revert this",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, change it!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startChangeStateUser(_id));
      return result.isConfirmed;
    }
  });
};
