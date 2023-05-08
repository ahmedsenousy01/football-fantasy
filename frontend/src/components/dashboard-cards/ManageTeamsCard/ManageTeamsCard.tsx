import {FC} from "react";
import DashboardLinkCard from "@/components/dashboard-cards/DashboardLinkCard/DashboardLinkCard";
import teamIcon from "@/assets/icons/team-icon.svg"

const ManageTeamsCard:FC = () => {
  return(
    <DashboardLinkCard
      id={"manage-teams"}
      title={"Manage Teams"}
      description={"Make changes to your team(s)"}
      to={"/teams"}
      imgSrc={teamIcon}
    />
  )
}

export default ManageTeamsCard;