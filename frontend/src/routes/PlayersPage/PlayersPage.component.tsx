import { FC, ReactEventHandler } from "react";
import "./PlayersPage.style.tsx.css";
import PlayerCard from "@/components/PlayerCard/PlayerCard.component";
import { Player } from "@/types/Game";
import { useSelector } from "react-redux";
import { selectUserBudget } from "@/store/User/User.slice";
import coinsIcon from "@/assets/icons/coins-icon.svg";

interface PlayersPageProps {
  players: Player[];
  currentPage: number;
  onNextPage: ReactEventHandler;
  onPrevPage: ReactEventHandler;
  totalPages: number;
  onEdit: ReactEventHandler;
  buyPlayer: (playerId: string) => any;
  delPlayer: (playerId: string) => any;
  isPlayerBought: (playerId: string) => boolean;
}

const PlayersPage: FC<PlayersPageProps> = ({
  delPlayer,
  buyPlayer,
  ...props
}) => {
  const budget = (useSelector(selectUserBudget) ?? 0) / 1000;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h5 className="budget">
          Budget:&nbsp;
          <img
            className={"icon inline-icon coins-icon"}
            src={coinsIcon}
            alt=""
          />
          {budget ? `${budget.toLocaleString()}k` : ""}
        </h5>
      </div>
      <nav className="pagination-nav text-center">
        <button
          disabled={props.currentPage <= 1}
          onClick={props.onPrevPage}
          className="btn prev-page-btn"
        >
          &lt;
        </button>
        <span className={"d-inline-block mx-3"}>{props.currentPage}</span>
        <button
          disabled={props.currentPage >= props.totalPages}
          onClick={props.onNextPage}
          className="btn next-page-btn"
        >
          &gt;
        </button>
      </nav>
      <div className="container">
        <div className="row g-3">
          {props.players.map((player) => (
            <div
              key={player._id}
              className="player-card-container col-xl-2 col-lg-3 col-md-4 col-6"
            >
              <PlayerCard
                isBought={props.isPlayerBought(player._id)}
                onDelete={() => {
                  delPlayer(player._id);
                }}
                buyPlayer={(e) => {
                  buyPlayer(player._id);
                }}
                player={player}
                onClick={props.onEdit}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
