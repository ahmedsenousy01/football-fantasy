import { FC, ReactEventHandler, useMemo, useState } from "react";
import PlayerPage from "@/routes/PlayerPage/PlayerPage.component";
import { useSelector } from "react-redux";
import {
  fetchPlayerById,
  selectEditingPlayer,
  selectLoadingPlayer,
  selectPlayer,
  setPlayer,
  startEditingPlayer,
  stopEditingPlayer,
} from "@/store/Players/Players.slice";
import PageLoader from "@/components/PageLoader/PageLoader";
import { useNavigate, useParams } from "react-router-dom";
import { createDefaultOnError } from "@/components/Form/Form.component";
import {
  FormSubmitHandler,
  FormSuccessHandler,
  Message,
} from "@/components/Form/Form.types";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { delPlayerRequest, putPlayer } from "@/api/requests/Players";
import { buyPlayerRequest } from "@/api/requests/Team";
import { AxiosResponse } from "axios";
import { assertDefined } from "@/utils/error/assert";
import { Player } from "@/types/Game";
import { selectUserTeamPlayers } from "@/store/User/User.slice";

const PlayerPageContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const playerId = useParams().id ?? "";
  const editing = useSelector(selectEditingPlayer);
  const [message, setMessage] = useState<Message | null>(null);
  const [submissionIsLoading, setSubmissionLoading] = useState<boolean>(false);

  const userTeamPlayers = useSelector(selectUserTeamPlayers);
  const userTeamPlayerIds = useMemo(
    () => userTeamPlayers?.map((player) => player._id),
    [userTeamPlayers]
  );
  const isBought = userTeamPlayerIds?.includes(playerId) ?? false;

  const pageLoading = useSelector(selectLoadingPlayer);

  useMemo(() => {
    dispatch(fetchPlayerById(playerId));
  }, []);

  const player = useSelector(selectPlayer);
  const startEditing: ReactEventHandler = () => {
    dispatch(startEditingPlayer());
  };
  const onCancel: ReactEventHandler = () => {
    dispatch(stopEditingPlayer());
  };

  const onSubmit: FormSubmitHandler = async (formResult) => {
    setSubmissionLoading(true);
    const response = await putPlayer(playerId, formResult);
    setSubmissionLoading(false);
    return response;
  };

  const onSuccess: FormSuccessHandler = (data) => {
    dispatch(stopEditingPlayer());
  };

  const buyPlayer = async (playerId: string) => {
    const response = (await buyPlayerRequest(playerId).catch(
      createDefaultOnError()
    )) as AxiosResponse;
    console.log(response);
    const updatedPlayer = response.data as Player;
    dispatch(setPlayer(updatedPlayer));
    console.log(updatedPlayer);
    assertDefined(response);
  };

  const delPlayer = async (playerId: string) => {
    const response = await delPlayerRequest(playerId);
    navigate("/players/1");
  };

  return pageLoading || player === undefined ? (
    <PageLoader />
  ) : (
    <PlayerPage
      {...player}
      editing={editing}
      onSubmit={onSubmit}
      onSuccess={onSuccess}
      onError={createDefaultOnError(setMessage)}
      startEditing={startEditing}
      onCancel={onCancel}
      message={message}
      isLoading={submissionIsLoading}
      onBuyPlayer={buyPlayer}
      onDelete={delPlayer}
      isBought={isBought}
    />
  );
};

export default PlayerPageContainer;
