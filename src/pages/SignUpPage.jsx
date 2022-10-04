import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const history = useNavigate();

  return (
    <div>
      <h2>SignUp Page</h2>
      <div>
        <button onClick={() => history("/")}>Go to home</button>
      </div>
    </div>
  );
};

export default SignUpPage;
