import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterForm/>
    </div>
  );
};

export default SignUpPage;
