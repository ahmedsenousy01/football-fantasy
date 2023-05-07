import {FC} from "react";
import ProfilePage from "@/routes/ProfilePage/ProfilePage.component";
import {useSelector} from "react-redux";
import {
  selectIsLoadingUserDetails,
  selectUserDetails,
} from "@/store/User/User.slice";
import "./ProfilePage.style.css";

const ProfilePageContainer: FC = () => {
  const userDetails = useSelector(selectUserDetails);
  const isLoading = useSelector(selectIsLoadingUserDetails);

  return <ProfilePage {...userDetails} isLoading={isLoading}/>;
};

export default ProfilePageContainer;
