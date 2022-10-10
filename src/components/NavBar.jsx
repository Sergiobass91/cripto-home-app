import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="hidden md:flex gap-4 text-2xl justify-end pt-2">
      <Link className="hover:text-green-400" to="/"> Home</Link>
      <Link className="hover:text-green-400" to="signup"> Sign Up</Link>
      <Link className="hover:text-green-400" to="login"> Login</Link>
      <Link className="hover:text-green-400" to="about"> About Us</Link>
    </ul>
  );
};

export default NavBar;
