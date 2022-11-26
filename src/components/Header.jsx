import NavBar from "./NavBar";
import Overview from "./Overview";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="flex justify-around h-auto sm:h-36 pb-2 bg-[#293143] text-white">
      <div className="flex flex-col text-center justify-around w-full px-2 max-w-[1000px] gap-3">
        <NavBar />
        <Overview />
      </div>
    </header>
  );
};

export default Header;
