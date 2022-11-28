import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import Stack from '../components/Stack';

const WalletPage = () => {

  const { logged } = useSelector((state) => state.login);
  const navigate = useNavigate();

  if (!logged)
    navigate("/");

  return (
    <Stack/>
  );
}

export default WalletPage;
