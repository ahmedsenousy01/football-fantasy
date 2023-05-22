import { FC, ReactEventHandler, useEffect, useState } from "react";
import PlayerPage from "@/routes/PlayerPage/PlayerPage.component";
import { useSelector } from "react-redux";
import {
  fetchPlayerById,
  selectEditingPlayer,
  selectPlayer,
  startEditingPlayer,
  stopEditingPlayer,
} from "@/store/Players/Players.slice";
import PageLoader from "@/components/PageLoader/PageLoader";
import { useParams } from "react-router-dom";
import { createDefaultOnError } from "@/components/Form/Form.component";
import { FormSubmitHandler, Message } from "@/components/Form/Form.types";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { putPlayer } from "@/api/requests/Players";
import { buyPlayerRequest } from "@/api/requests/Team";
import { AxiosResponse } from "axios";
import { assertDefined } from "@/utils/error/assert";

const PlayerPageContainer: FC = () => {
  const dispatch = useAppDispatch();

  const playerId = useParams().id ?? "";
  const player = useSelector(selectPlayer);
  const editing = useSelector(selectEditingPlayer);
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (player === undefined) {
      dispatch(fetchPlayerById(playerId));
    }
  }, []);

  const startEditing: ReactEventHandler = () => {
    dispatch(startEditingPlayer());
  };
  const onCancel: ReactEventHandler = () => {
    dispatch(stopEditingPlayer());
  };

  const onSubmit: FormSubmitHandler = async (formResult) => {
    console.log(JSON.stringify(formResult));
    setLoading(true);
    const response = await putPlayer(playerId, formResult);
    setLoading(false);
    return response;
  };

  const buy = async (playerId: string) => {
    console.log(`buying player: ${playerId}`);
    const response = (await buyPlayerRequest(playerId).catch(
      createDefaultOnError()
    )) as AxiosResponse;
    assertDefined(response);
  };

  return player === undefined ? (
    <PageLoader />
  ) : (
    <PlayerPage
      {...player}
      editing={editing}
      onSubmit={onSubmit}
      onError={createDefaultOnError(setMessage)}
      startEditing={startEditing}
      onCancel={onCancel}
      message={message}
      isLoading={isLoading}
      onBuy={buy}
    />
  );
};

export default PlayerPageContainer;
