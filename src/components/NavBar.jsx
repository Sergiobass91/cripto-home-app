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
      <ul className="hidden w-[90%] md:flex gap-4 text-2xl justify-end pt-2">
        {/* <Link className="hover:text-green-400" to="/"> Home |</Link> */}
        {/* <Link className="hover:text-green-400" to="about"> About Us |</Link> */}
        
        {!logged && 
          (
            <>
              <Link className="hover:text-green-400" to="signup"> Sign up |</Link>
              <Link className="hover:text-green-400" to="login"> Log in |</Link>
            </>
          ) || 
          (
            <>
              <Link className="hover:text-green-400" to="wallet"> My Wallet |</Link>
              <button onClick={handleLogOut} className="hover:text-green-400" to="about"> Log out |</button>
            </>
          )
        }
      </ul>
  );
};

export default NavBar;
