import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

const SignUpPage = () => {
  const history = useNavigate();

  return (
    <div>
      {/* <Header /> */}
      <LoginForm />
      {/* <Footer/> */}
    </div>
  );
};

export default SignUpPage;
