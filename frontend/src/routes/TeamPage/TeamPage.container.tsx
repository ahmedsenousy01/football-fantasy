import { FC, useState } from "react";
import TeamPageComponent from "@/routes/TeamPage/TeamPage.component";
import { Team } from "@/types/Game";
import { useSelector } from "react-redux";
import {
  fetchUserDetails,
  selectIsLoadingUserDetails,
  selectUserDetails,
} from "@/store/User/User.slice";
import PageLoader from "@/components/PageLoader/PageLoader";
import { sellPlayerRequest } from "@/api/requests/Team";
import { useAppDispatch } from "@/hooks/redux-hooks";

const TeamPage: FC = () => {
  const team: Team | undefined = useSelector(selectUserDetails)?.team;
  const dispatch = useAppDispatch();
  const loadingDetails = useSelector(selectIsLoadingUserDetails);
  const [loadingSale, setLoadingSale] = useState(false);

  const sellPlayer = async (playerId: string) => {
    setLoadingSale(true);
    const response = await sellPlayerRequest(playerId);
    setLoadingSale(false);
    dispatch(fetchUserDetails());
  };

  return loadingSale || loadingDetails || team === undefined ? (
    <PageLoader />
  ) : (
    <TeamPageComponent sellPlayer={sellPlayer} team={team} />
  );
};

export default TeamPage;
