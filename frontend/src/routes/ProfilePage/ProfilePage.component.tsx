import { FC } from "react";
import { UserDetails } from "@/store/User/User.slice";
import userIcon from "@/assets/icons/user-icon.svg";

type ProfilePageProps = Partial<UserDetails>;

const ProfilePage: FC<ProfilePageProps> = (props) => {
  console.log(props);
  return (
    <div
      id={"profile-page"}
      className="page-wrapper d-flex flex-column justify-content-center align-items-center h-lg-100"
    >
      <main className="large-box-main">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-3 w-fit">
              <div className={"profile-pic-container"}>
                {props.profilePicture ? (
                  <img src={props.profilePicture} alt={"Profile Picture"} />
                ) : (
                  <img src={userIcon} alt="No Profile Picture Available" />
                )}
              </div>
            </div>
            <div className="col">
              <h1 className={"text-capitalize"}>{props.firstName + " " + props.lastName}</h1>
              <h4 className="muted">{props.email}</h4>
              <h5 className={"budget"}>{props.budget}</h5>
            </div>
          </div>
          <div className="row">

          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
