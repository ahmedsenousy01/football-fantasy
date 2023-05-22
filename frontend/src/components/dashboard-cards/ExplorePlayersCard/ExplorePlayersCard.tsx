import {FC} from "react";
import {useSelector} from "react-redux";
import {selectUserRole} from "@/store/User/User.slice";
import footballPlayerIcon from "@/assets/icons/football-player-icon.png";
import DashboardLinkCard from "@/components/dashboard-cards/DashboardLinkCard/DashboardLinkCard";

const ExplorePlayersCard: FC = () => {
  const userRole = useSelector(selectUserRole);

  return (
    <DashboardLinkCard
      id={"explore-players-card"}
      title={"Explore Players"}
      to={"/players/1"}
      description={`Browse through${userRole === "admin" ? ", and edit," : ""} players`}
      imgSrc={footballPlayerIcon}
    />
  );
};

export default ExplorePlayersCard;
