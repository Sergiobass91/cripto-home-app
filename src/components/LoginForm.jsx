import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, onAuth, signInGoogleAccount } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast } from "../models/commonToast";
import Modal from "./ModalForm";
import InputForm from "./pure/InputForm";
import ButtonForm from "./pure/ButtonForm";
import GoogleIcon from "../assets/icons/GoogleIcon";

const LoginForm = () => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isGoogleLogin) {
      try {
        await signInGoogleAccount()
        dispatch(setAuth({ logged: true }));
        navigate("/");
        successToast("Iniciaste sesi�n con google");
      }
      catch (error) {
        errorToast("Ups, hubo un error al iniciar sesión con Google");
  
      }
    } else {
      try {
        await logIn(emailRef.current.value, passwordRef.current.value);
        onAuth();
        dispatch(setAuth({ logged: true }));
        navigate("/");
      } catch (error) {
        errorToast("Ups, hubo un error al iniciar sesión");
      }
    }
  };

  return (
    <div className="mt-8 mx-auto min-h-[calc(100vh-240px)]">
      <form
        className="bg-[#293143] shadow-lg border rounded-lg max-w-[600px] mx-auto  p-8 mb-4"
        onSubmit={handleSubmit}
        id="form"
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
        <div className="flex flex-wrap justify-center sm:justify-between pt-4 align-middle">
          <button className="text-white" onClick={()=>setIsGoogleLogin(true)}>
          <GoogleIcon />
          </button>
          <Link
            className="inline-block font-bold text-sm mt-3 text-orange-500 hover:text-orange-300"
            onClick={()=> setIsOpenModal(true)}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
      <Modal onOpen={isOpenModal} setToClose={setIsOpenModal}/>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
