import NavBar from "./NavBar";
import Overview from "./Overview";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="flex justify-around h-48 md:h-40 bg-[#293143] text-white">
      <img
          className="absolute left-1 top-0 md:top-6 invisible sm:visible"
          src="src\assets\icons\ch_logo.png"
        />
      <div className="flex flex-col text-center justify-around w-3/4">
        <NavBar />
        <Link className="font-serif text-5xl pb-8" to="/">Cripto Home</Link>
        <Overview />
      </div>
    </header>
  );
};

export default Header;
