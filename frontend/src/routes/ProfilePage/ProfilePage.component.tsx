import {FC} from "react";
import {UserDetails} from "@/store/User/User.slice";
import userIcon from "@/assets/icons/user-icon.svg";
import coinsIcon from "@/assets/icons/coins-icon.svg";
import PageLoader from "@/components/PageLoader/PageLoader";

type ProfilePageProps = Partial<UserDetails> & { isLoading: boolean };

const ProfilePage: FC<ProfilePageProps> = (props) => {
  console.log(props);
  return props.isLoading ? (
    <PageLoader/>
  ) : (
    <div
      id={"profile-page"}
      className="page-wrapper d-flex flex-column justify-content-center align-items-center h-100"
    >
      <main className="box-main w-fit m-2">
        <div className="container py-4 w-fit">
          <div className="row align-items-center mb-3">
            <div className="col-3 w-fit">
              <div className={"profile-pic-container img-container"}>
                {props.profilePicture ? (
                  <img src={props.profilePicture} alt={"Profile Picture"}/>
                ) : (
                  <img
                    className={"icon"}
                    src={userIcon}
                    alt="No Profile Picture Available"
                  />
                )}
              </div>
            </div>
            <div className="col">
              <h1 className={"text-capitalize"}>
                {props.firstName + " " + props.lastName}
              </h1>
              <h4 className="muted">{props.email}</h4>
              <h5 className={"budget"}>
                <img
                  className={"icon inline-icon coins-icon"}
                  src={coinsIcon}
                  alt=""
                />
                {props.budget?.toLocaleString()}
              </h5>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className={"league-info"}>
              <div className="logo-container img-container">
                <img
                  className={"logo object-contain"}
                  src={props.league?.logo}
                  alt=""
                />
              </div>
              <div className="league-caption w-fit mx-auto">
                <h2>Premier League</h2>
                <div className={"flag-container img-container"}>
                  <img
                    className={"flag object-contain"}
                    src={props.league?.flag}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
