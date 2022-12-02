import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp, updateUser } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";
import { ToastContainer } from "react-toastify";
import { errorToast } from "../models/commonToast";
import InputForm from "./pure/InputForm";
import ButtonForm from "./pure/ButtonForm";

const RegisterForm = () => {

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(emailRef.current.value, passwordRef.current.value);
      updateUser(nameRef.current.value);
      dispatch(setAuth({ logged: true }));
      navigate("/");
    } 
    catch (error) {
      errorToast(`Lo sentimos ${nameRef.current.value}, hubo un error creando la cuenta`)
      console.error(`${error}`);
    }
  };

  return (
    <div className="mt-8 mx-auto min-h-[calc(100vh-240px)]">
      <form
        className="bg-[#293143] shadow-lg border rounded-lg max-w-[600px] mx-auto  p-8 mb-4"
        onSubmit={handleSubmit}
      >
        <InputForm
          typeRef={emailRef}
          typeInput="email"
          id="email"
          text="E-mail"
        />
        <InputForm typeRef={nameRef} typeInput="name" id="name" text="Nombre" />
        <InputForm
          typeRef={passwordRef}
          typeInput="password"
          id="password"
          text="Contraseña"
        />

        <ButtonForm
          text="Registrarse"
          classes="w-full bg-green-500 text-white font-semibold text-lg p-3 rounded-md hover:bg-green-600"
        />

        <Link
          className="inline-block font-bold text-sm mt-3 text-orange-500 hover:text-orange-300"
          to="/login"
        >
          ¿Ya tenés cuenta? iniciá sesión
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
