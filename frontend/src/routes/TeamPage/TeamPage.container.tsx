import { FC } from "react";
import TeamPageComponent from "@/routes/TeamPage/TeamPage.component";
import { Team } from "@/types/Game";
import { useSelector } from "react-redux";
import { selectUserDetails } from "@/store/User/User.slice";
import PageLoader from "@/components/PageLoader/PageLoader";

const TeamPage: FC = () => {
  const team: Team | undefined = useSelector(selectUserDetails)?.team;

  return team === undefined ? <PageLoader /> : <TeamPageComponent {...team} />;
};

export default TeamPage;
