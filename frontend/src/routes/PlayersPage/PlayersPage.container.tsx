import { FC, useEffect } from "react";
import PlayersPage from "@/routes/PlayersPage/PlayersPage.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  fetchPlayersPage,
  selectPlayers,
  selectTotalPages,
  startEditingPlayer,
} from "@/store/Players/Players.slice";
import { navigateTo } from "@/utils/Url/Url";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { buyPlayerRequest } from "@/api/requests/Team";
import { createDefaultOnError } from "@/components/Form/Form.component";
import { AxiosResponse } from "axios";
import { assertDefined } from "@/utils/error/assert";

const PlayersPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const page = parseInt(useParams().page ?? "1");
  useEffect(() => {
    dispatch(fetchPlayersPage(page));
  }, []);
  const players = useSelector(selectPlayers);
  const totalPages = useSelector(selectTotalPages);

  const onBuy = async (playerId: string) => {
    console.log(`buying player: ${playerId}`);
    const response = (await buyPlayerRequest(playerId).catch(
      createDefaultOnError()
    )) as AxiosResponse;
    assertDefined(response);
  };

  const nextPage = () => navigateTo(`/players/${page + 1}`);
  const prevPage = () => navigateTo(`/players/${page - 1}`);

  return (
    <PlayersPage
      players={players}
      currentPage={page}
      onNextPage={() => nextPage()}
      onPrevPage={() => prevPage()}
      totalPages={totalPages}
      onEdit={() => dispatch(startEditingPlayer())}
      onBuy={(playerId) => onBuy(playerId)}
    />
  );
};

export default PlayersPageContainer;
