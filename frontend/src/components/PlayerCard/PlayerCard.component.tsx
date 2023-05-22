import { FC, HTMLProps, ReactEventHandler } from "react";
import { Link } from "react-router-dom";
import { Player } from "@/types/Game";
import { selectUserRole } from "@/store/User/User.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { stopEditingPlayer } from "@/store/Players/Players.slice";

interface PlayerCardProps extends HTMLProps<HTMLDivElement> {
  player: Player;
  onBuy: ReactEventHandler;
}

const PlayerCard: FC<PlayerCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const { player, ...htmlProps } = props;
  const userRole = useSelector(selectUserRole);

  return (
    <div className={"card-box h-100 text-center"} {...htmlProps}>
      <Link
        to={`/player/${player._id}`}
        onClick={() => dispatch(stopEditingPlayer())}
      >
        <img className={"rounded-circle "} src={player.picture} alt="" />
        <h4>{player.name}</h4>
      </Link>
      <h5 className={"muted fw-normal"}>Points {player.points}</h5>
      {userRole === "user" ? (
        <button onClick={props.onBuy} className={"btn"}>
          BUY ${props.player.price}
        </button>
      ) : (
        userRole === "admin" && (
          <Link to={`/player/${player._id}`}>Edit Player</Link>
        )
      )}
    </div>
  );
};

export default PlayerCard;
