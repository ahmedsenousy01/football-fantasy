import {FC} from "react";
import "./PageLoader.style.css";

const PageLoader: FC = () => {
  return (
    <div className="page-wrapper d-flex justify-content-center align-items-center">
      <div className="lds-page">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default PageLoader;