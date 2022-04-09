import Swal, { SweetAlertOptions } from "sweetalert2";
import { startCatRemove } from "../redux/actions/categoryActions";
import { startOrderCancel } from "../redux/actions/OrderActions";
import { startProdRemove } from "../redux/actions/productActions";
import { startBrandDelete } from "../redux/actions/brandActions";
import { startCartRemove } from "../redux/actions/cartActions";

export const confirmDeleteCategory = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete category!",
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
    confirmButtonText: "Yes, delete product!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startProdRemove(_id));
    }
  });
};

export const confirmDeleteBrand = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete brand!",
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      dispatch(startBrandDelete(_id));
    }
  });
};

export const confirmCancelOrder = (_id: string, dispatch: any) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel order!",
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
