import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AboutPage = () => {
  
  const history = useNavigate();

  return (
    <>
      <Header/>
      <div>
        <h1 className="text-4xl text-center pt-8">About page</h1>
        <button className="bg-orange-400" onClick={() => history("/")}>Go to home</button>
      </div>
    </>
  );
};

export default AboutPage;
