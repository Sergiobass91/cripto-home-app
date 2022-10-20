import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {

  const history = useNavigate();

  return (
    <>
    <LoginForm/>
    </>
  );
};

export default LoginPage;
