import { FC } from "react";
import { Team } from "@/types/Game";
import PlayerCard from "@/components/PlayerCard/PlayerCard.component";
import coinsIcon from "@/assets/icons/coins-icon.svg";
import { selectUserBudget } from "@/store/User/User.slice";
import { useSelector } from "react-redux";

interface TeamPageProps {
  team: Team;
  sellPlayer: (playerId: string) => any;
}

const TeamPageComponent: FC<TeamPageProps> = (props) => {
  const budget = useSelector(selectUserBudget);

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="row">
          <h1>{props.team.name}</h1>
        </div>
        <h5 className="budget">
          Budget:&nbsp;
          <img
            className={"icon inline-icon coins-icon"}
            src={coinsIcon}
            alt=""
          />
          {budget ? `${budget.toLocaleString()}k` : ""}
        </h5>
        <div className="row g-3">
          {props.team.players.map((player) => (
            <div
              key={player._id}
              className="player-card-container col-xl-2 col-lg-3 col-md-4 col-6"
            >
              <PlayerCard
                mode={"sell"}
                player={player}
                sellPlayer={() => {
                  props.sellPlayer(player._id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPageComponent;
