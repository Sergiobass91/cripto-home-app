import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  
  const history = useNavigate();

  return (
    <div>
      <h2>About page</h2>
      <div>
        <button onClick={() => history("/")}>Go to home</button>
      </div>
    </div>
  );
};

export default AboutPage;
