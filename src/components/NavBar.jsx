import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";

const NavBar = () => {

  const { logged } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logOut();
    dispatch(setAuth({logged: false}))
    navigate("/");
  }

  return (
    <ul className="md:flex gap-4 text-2xl justify-between pt-2">
      <div className="flex items-center gap-2">
        <img
          className="w-14 h-14"
          src="src\assets\icons\ch_logo.png"
        />
        <Link className="font-serif text-4xl" to="/">
          Cripto Home
        </Link>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {" "}
        {(!logged && (
          <>
            <Link
              className="hover:text-green-400 text-base border-zinc-500 border bg-[#232a3b] p-2 rounded px-4"
              to="signup"
            >
              {" "}
              <strong>Sign up</strong>
            </Link>
            <Link
              className="hover:text-green-400 text-base border-zinc-500 border bg-[#232a3b] p-2 rounded px-4"
              to="login"
            >
              {" "}
              <strong>Log in</strong>
            </Link>
          </>
        )) || (
          <>
            <Link className="hover:text-green-400 text-base border-zinc-500 border bg-[#232a3b] p-2 rounded px-4" to="wallet">
              {" "}
              <strong>My Wallet</strong>
            </Link>
            <button
              onClick={handleLogOut}
              className="hover:text-green-400 text-base border-zinc-500 border bg-[#232a3b] p-2 rounded px-4"
              to="about"
            >
              <strong>Log out</strong>
            </button>
          </>
        )}
      </div>
    </ul>
  );
};

export default NavBar;
