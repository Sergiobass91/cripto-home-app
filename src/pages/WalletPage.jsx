import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { StyleToastGeneric } from "../models/commonToast";
import Stack from '../components/Stack';

const WalletPage = () => {

  const { logged } = useSelector((state) => state.login);

  if (!logged) {
    toast.warning("Debes crear un usuario para acceder a la billetera", StyleToastGeneric)
    return <Navigate to="/signup"/>;
  }
  
  return (
    <Stack/>
  );
}

export default WalletPage;
