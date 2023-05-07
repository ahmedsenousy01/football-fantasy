import {FC} from "react";
import {useSelector} from "react-redux";
import {selectUserRole} from "@/store/User/User.slice";
import {Link} from "react-router-dom";
import footballPlayerIcon from "@/assets/icons/football-player-icon.png";

const ExplorePlayersCard: FC = () => {
  const userRole = useSelector(selectUserRole);

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
            Browse through {userRole === "admin" ? ", and edit, " : ""} players
          </p>
        </div>
        <div className="team-icon-container img-container">
          <img className={"team-icon icon"} src={footballPlayerIcon} alt=""/>
        </div>
      </Link>
    </div>
  );
};

export default ExplorePlayersCard;
