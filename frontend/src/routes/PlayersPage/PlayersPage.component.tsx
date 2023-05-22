import { FC, ReactEventHandler } from "react";
import "./PlayersPage.style.tsx.css";
import PlayerCard from "@/components/PlayerCard/PlayerCard.component";
import { Player } from "@/types/Game";

interface PlayersPageProps {
  players: Player[];
  currentPage: number;
  onNextPage: ReactEventHandler;
  onPrevPage: ReactEventHandler;
  totalPages: number;
  onEdit: ReactEventHandler;
  onBuy: (playerId: string) => any;
}

const PlayersPage: FC<PlayersPageProps> = ({ onBuy, ...props }) => {
  return (
    <div className="page-wrapper">
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
                onBuy={(e) => {
                  onBuy(player._id);
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
