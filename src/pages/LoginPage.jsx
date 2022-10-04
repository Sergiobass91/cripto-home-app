import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const history = useNavigate();

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <button onClick={() => history("/")}>Go to home</button>
      </div>
    </div>
  );
};

export default LoginPage;
