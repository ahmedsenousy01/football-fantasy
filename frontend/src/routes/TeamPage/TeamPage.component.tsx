import { FC } from "react";
import { Team } from "@/types/Game";

interface TeamPageProps extends Team {}

const TeamPageComponent: FC<TeamPageProps> = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="row">{props.name}</div>
      </div>
    </div>
  );
};

export default TeamPageComponent;
