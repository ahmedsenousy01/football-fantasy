import { FC } from "react";
import { Link } from "react-router-dom";

interface DashboardLinkCardProps{
  title: string;
  id?: string;
  description?: string;
  imgSrc?: string;
  to: string;
  className?: string;
}

const DashboardLinkCard: FC<DashboardLinkCardProps> = (props) => {
  return (
    <div id={props.id} className={"dashboard-card-container col-md-6 px-4" + (props.className ?? "")}>
      <Link
        className={
          "box-link dashboard-card m-0 p-3 d-flex justify-content-between"
        }
        to={props.to}
      >
        <div>
          <h2>{props.title}</h2>
          {props.description ? <p className={"muted mb-2"}>{props.description}</p> : ""}
        </div>
        {props.imgSrc ? <div className="dashboard-card-icon-container img-container">
          <img className={"dashboard-card-icon icon"} src={props.imgSrc} alt=""/>
        </div> : ""}
      </Link>
    </div>
  );
};

export default DashboardLinkCard;