import {FC, useEffect} from "react";
import ProfilePage from "@/routes/ProfilePage/ProfilePage.component";
import {useSelector} from "react-redux";
import {fetchUserDetails, selectUserDetails} from "@/store/User/User.slice";
import {useAppDispatch} from "@/hooks/redux-hooks";
import "./ProfilePage.style.css"

const ProfilePageContainer:FC = () => {
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userDetails == undefined) {
      dispatch(fetchUserDetails());
    }
  });

  return(
    <ProfilePage
      {...userDetails}
    />
  )
}

export default ProfilePageContainer;