import { useRef } from "react";
import ReactModal from "react-modal";
import { resetUserPassword } from "../auth/useAuth";
import { errorToast, successToast } from "../models/commonToast";
import InputForm from "./pure/InputForm";

ReactModal.setAppElement("#root");
const Modal = ({ onOpen, setToClose }) => {
  const emailRef = useRef();

  const handleCloseModal = () => {
    setToClose(false);
  };

  const handleResetPassword = async () => {
    try {
      await resetUserPassword(emailRef.current.value);
      handleCloseModal();
      successToast("El e-mail se ha enviado con éxito");
    } catch (e) {
      errorToast("Ups, hubo un problema la enviar el e-mail, verifica el correo");
    }
  };

  const styleForModal = {
    overlay: {
      top: "40%",
      left: "50%",
      width: "40%",
      height: "380px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    content: {
      border: "1px solid #ccc",
      background: "#293143",
      overflow: "auto",
      WebkitOverflowScrolling: "none",
      borderRadius: "10px",
      outline: "none",
      padding: "50px",
    },
  };

  return (
    <ReactModal isOpen={onOpen} style={styleForModal}>
      <div className="flex flex-col gap-3 flex-wrap content-center">
        <h1 className="text-center font-bold text-lg text-white">
          Recuperar Contraseña
        </h1>
        <button
          onClick={handleCloseModal}
          className="text-white text-2xl absolute top-7"
        >
          <span>X</span>
        </button>
        <InputForm
          typeRef={emailRef}
          typeInput="email"
          id="email"
          text="E-mail"
        />
        <button
          onClick={handleResetPassword}
          className="w-full bg-green-500 text-white font-semibold text-lg p-3 rounded-md hover:bg-green-600 "
        >
          Enviar
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
