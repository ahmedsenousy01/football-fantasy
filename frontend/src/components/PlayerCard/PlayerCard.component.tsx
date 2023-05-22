import { FC, HTMLProps, ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import { Player } from "@/types/Game";
import { selectUserRole } from "@/store/User/User.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { stopEditingPlayer } from "@/store/Players/Players.slice";
import xIcon from "@/assets/icons/x-icon.svg";

interface PlayerCardProps extends HTMLProps<HTMLDivElement> {
  player: Player;
  isBought?: boolean;
  buyPlayer?: ReactEventHandler;
  sellPlayer?: ReactEventHandler;
  onDelete?: ReactEventHandler;
  mode?: "buy" | "sell";
}

const PlayerCard: FC<PlayerCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const { player, isBought, buyPlayer, onDelete, ...htmlProps } = props;
  const userRole = useSelector(selectUserRole);
  const mode = props.mode ?? "buy";

  return (
    <div
      className={
        "card-box h-100 text-center d-flex flex-column justify-content-between"
      }
      {...htmlProps}
    >
      {userRole === "admin" && (
        <div className="d-flex justify-content-end">
          <button
            className={"bg-transparent border-0 text-danger"}
            onClick={(e) => {
              // @ts-ignore
              props.onDelete(e);
            }}
          >
            <img className={"inline-icon"} src={xIcon} alt="" />
          </button>
        </div>
      )}
      <Link
        to={`/player/${player._id}`}
        onClick={() => dispatch(stopEditingPlayer())}
      >
        <img className={"rounded-circle "} src={player.picture} alt="" />
        <h4>{player.name}</h4>
      </Link>
      <h5 className={"muted fw-normal"}>Points {player.points}</h5>
      {userRole === "user" ? (
        mode === "buy" ? (
          <button
            disabled={props.isBought}
            onClick={(e) => {
              // @ts-ignore
              props.buyPlayer(e);
            }}
            className={"btn"}
          >
            {props.isBought ? "BOUGHT" : `BUY $${props.player.price}`}
          </button>
        ) : (
          <button
            disabled={props.isBought}
            onClick={(e) => {
              // @ts-ignore
              props.sellPlayer(e);
            }}
            className={"btn"}
          >
            SELL FOR ${props.player.price}
          </button>
        )
      ) : (
        userRole === "admin" && (
          <Link to={`/player/${player._id}`}>Edit Player</Link>
        )
      )}
    </div>
  );
};

export default PlayerCard;
