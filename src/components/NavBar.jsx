import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="hidden md:flex gap-4 text-xl justify-end pt-2 mr-8">
      <Link to="signup"> Sign Up</Link>
      <Link to="login"> Login</Link>
      <Link to="about"> About Us</Link>
    </ul>
  );
};

export default NavBar;
