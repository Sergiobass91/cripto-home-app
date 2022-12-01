import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyleToastGeneric = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: "colored",
}

export const styleToastForAccount = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: "colored",
}

export const errorToast = (message) =>
  toast.error(message, styleToastForAccount);


export const successToast = (message) =>
  toast.success(message, styleToastForAccount);

export const infoToast = (message) =>
  toast.info(message, styleToastForAccount);
