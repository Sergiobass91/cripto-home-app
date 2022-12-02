import { Link, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";
import LogoIcon from "../assets/icons/LogoIcon";

const NavBar = () => {

  const { logged } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logOut();
    dispatch(setAuth({logged: false}))
    return <Navigate to="/"/>;
  }

  return (
    <ul className="md:flex gap-4 text-2xl justify-between pt-2">
      <div className="flex items-center gap-2">
        <LogoIcon />
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
