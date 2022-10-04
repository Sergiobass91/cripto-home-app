import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const history = useNavigate();

  return (
    <div>
      <h2>Not Found</h2>
      <div>
        <button onClick={() => history("/")}>Go to home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
