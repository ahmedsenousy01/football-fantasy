import { FC, useEffect, useState } from "react";
import PlayersPage from "@/routes/PlayersPage/PlayersPage.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  fetchPlayersPage,
  searchPlayers,
  selectLoadingPlayers,
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
import { delPlayerRequest } from "@/api/requests/Players";
import PageLoader from "@/components/PageLoader/PageLoader";
import {
  fetchUserDetails,
  selectUserTeamPlayers,
} from "@/store/User/User.slice";

const PlayersPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const page = parseInt(useParams().page ?? "1");
  useEffect(() => {
    dispatch(fetchPlayersPage(page));
  }, []);
  const players = useSelector(selectPlayers);
  const totalPages = useSelector(selectTotalPages);
  const isPageLoading = useSelector(selectLoadingPlayers);
  const userTeamPlayerIds = useSelector(selectUserTeamPlayers)?.map(
    (player) => player._id
  );
  const [searchText, setSearchText] = useState("");

  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const isPlayerBought = (playerId: string) => {
    if (userTeamPlayerIds !== undefined)
      return userTeamPlayerIds.includes(playerId);
    return false;
  };

  const buyPlayer = async (playerId: string) => {
    console.log(`buying player: ${playerId}`);
    setLoadingPurchase(true);
    const response = (await buyPlayerRequest(playerId).catch(
      createDefaultOnError()
    )) as AxiosResponse<any, any>;
    setLoadingPurchase(false);
    dispatch(fetchUserDetails());
    assertDefined(response);
  };

  const onSearch = () => {
    dispatch(searchPlayers({ name: searchText, page: 1 }));
  };

  const onDelete = async (playerId: string) => {
    const response = await delPlayerRequest(playerId);
    dispatch(fetchPlayersPage(page));
  };

  const nextPage = () => navigateTo(`/players/${page + 1}`);
  const prevPage = () => navigateTo(`/players/${page - 1}`);

  return isPageLoading || loadingPurchase ? (
    <PageLoader />
  ) : (
    <PlayersPage
      searchText={searchText}
      setSearchText={(s: string) => setSearchText(s)}
      onSearch={onSearch}
      players={players}
      currentPage={page}
      onNextPage={() => nextPage()}
      onPrevPage={() => prevPage()}
      totalPages={totalPages}
      onEdit={() => dispatch(startEditingPlayer())}
      buyPlayer={(playerId) => buyPlayer(playerId)}
      delPlayer={(playerId) => onDelete(playerId)}
      isPlayerBought={isPlayerBought}
    />
  );
};

export default PlayersPageContainer;
