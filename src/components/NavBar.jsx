import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../auth/useAuth";
import { setAuth } from "../reducers/authSlice";

const NavBar = () => {

  const { logged } = useSelector((state) => state.login);


  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logOut();
    dispatch(setAuth({logged: false}))
  }

  return (
      <ul className="hidden md:flex gap-4 text-2xl justify-end pt-2">
        <Link className="hover:text-green-400" to="/"> Home |</Link>
        <Link className="hover:text-green-400" to="about"> About Us |</Link>
        
        {!logged && 
          (<>
            <Link className="hover:text-green-400" to="signup"> Sign up |</Link>
            <Link className="hover:text-green-400" to="login"> Log in |</Link>
          </>
          ) || (<button onClick={handleLogOut} className="hover:text-green-400" to="about"> Log out |</button>)
        }
      </ul>
  );
};

export default NavBar;
