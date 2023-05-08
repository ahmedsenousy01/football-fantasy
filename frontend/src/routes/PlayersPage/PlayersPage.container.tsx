import {FC, useEffect} from "react";
import PlayersPage from "@/routes/PlayersPage/PlayersPage.component";
import {useAppDispatch} from "@/hooks/redux-hooks";
import {fetchPlayersPage} from "@/store/Players/Players.slice";

const PlayersPageContainer:FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlayersPage());
  })

  return(
    <PlayersPage
      playerCards={[]}
    />
  )
}

export default PlayersPageContainer;