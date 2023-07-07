import { FC } from "react";
import "./PageLoader.style.css";

const PageLoader: FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 m-0">
      <div className="rect-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default PageLoader;
