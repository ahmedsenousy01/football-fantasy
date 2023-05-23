import { FC } from "react";
import DashboardLinkCard from "@/components/dashboard-cards/DashboardLinkCard/DashboardLinkCard";
import teamIcon from "@/assets/icons/team-icon.svg";

const ManageTeamsCard: FC = () => {
  return (
    <DashboardLinkCard
      id={"manage-team"}
      title={"Manage Team"}
      description={"Make changes to your team"}
      to={"/team"}
      imgSrc={teamIcon}
    />
  );
};

export default ManageTeamsCard;
