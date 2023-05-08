import {FC} from "react";
import teamIcon from "@/assets/icons/team-icon.svg"
import DashboardLinkCard from "@/components/dashboard-cards/DashboardLinkCard/DashboardLinkCard";

const EditUsersCard: FC = () => {
  return (
    <DashboardLinkCard
      id={"edit-users-card"}
      title={"Edit Users"}
      description={"Find users and change details"}
      to={"/users"}
      imgSrc={teamIcon}
    />
  )
}

export default EditUsersCard;