import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, onAuth, resetUserPassword } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";
import { ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
import { errorToast } from "../models/commonToast";
import InputForm from "./pure/InputForm";
import ButtonForm from "./pure/ButtonForm";

const LoginForm = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      onAuth();
      dispatch(setAuth({ logged: true }));
      navigate("/");
    } catch (error) {
      errorToast("Ups, hubo un error al iniciar sesión");
    }
  };

  const handleResetPassword = async()=> {
    await resetUserPassword(emailRef.current.value);
  }

  return (
    <div className="mt-8 mx-auto min-h-[calc(100vh-240px)]">
      <form
        className="bg-white shadow-lg border rounded max-w-[600px] mx-auto  p-8 mb-4"
        onSubmit={handleSubmit}
      >
        <InputForm
          typeRef={emailRef}
          typeInput="email"
          id="email"
          text="E-mail"
        />
        <InputForm
          typeRef={passwordRef}
          typeInput="password"
          id="password"
          text="Contraseña"
        />

        <ButtonForm
          text="Iniciar Sesión"
          classes="w-full bg-green-500 text-white font-semibold text-lg p-3 rounded-md hover:bg-green-600"
        />
        <Link
          className="inline-block font-bold text-sm mt-3 text-orange-600 hover:text-orange-800"
          to="/resetPassword"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
