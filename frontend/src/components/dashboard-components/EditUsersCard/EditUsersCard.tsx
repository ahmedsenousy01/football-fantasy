import {FC} from "react";
import {Link} from "react-router-dom";
import footballPlayerIcon from "@/assets/icons/football-player-icon.png";

const EditUsersCard: FC = () => {
  return (
    <div className="dashboard-card-container col-md-6 px-4">
      <Link
        className={
          "box-link dashboard-card m-0 p-3 d-flex justify-content-between"
        }
        to="/players"
      >
        <div>
          <h2>Explore Players</h2>
          <p className={"muted mb-2"}>
            Browse through and edit users
          </p>
        </div>
        <div className="team-icon-container img-container">
          <img className={"team-icon icon"} src={footballPlayerIcon} alt=""/>
        </div>
      </Link>
    </div>
  )
}

export default EditUsersCard;