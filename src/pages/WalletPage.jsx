import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StyleToastGeneric } from "../models/commonToast";
import Stack from "../components/Stack";

const WalletPage = () => {
  const { logged } = useSelector((state) => state.login);

  if (!logged) {
    toast.warning(
      "Debes iniciar sesión para acceder a la billetera",
      StyleToastGeneric
    );
    return <Navigate to="/login" />;
  }

  return <Stack />;
};

export default WalletPage;
