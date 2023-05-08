import {FC} from "react";
import {useSelector} from "react-redux";
import {
  selectIsLoadingUserDetails,
  selectUserDetails,
  selectUserRole,
} from "@/store/User/User.slice";
import PageLoader from "@/components/PageLoader/PageLoader";
import AdminDashboard from "@/routes/admin/Dashboard/Dashboard";
import UserDashboard from "@/routes/user/Dashboard/Dashboard";
import "./Dashboard.style.css";

const Dashboard: FC = () => {
  const userDetails = useSelector(selectUserDetails);
  const userRole = useSelector(selectUserRole);
  const loadingRole = useSelector(selectIsLoadingUserDetails);

  if (userRole === undefined) {
    window.location.replace("/login");
  }

  return loadingRole ? (
    <PageLoader/>
  ) : (
    <div
      className={
        "page-wrapper d-flex flex-column justify-content-center align-items-center"
      }
    >
      <div className="dashboard-header text-center mb-3">
        <h1 className={"dashboard-welcome mt-3 mb-1"}>
          Hello,{" "}
          {userDetails
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : ""}
          !
        </h1>
        <h4 className="muted w-100">
          {userDetails ? userDetails.email : ""}
        </h4>
      </div>
      {userRole === "admin" ? <AdminDashboard/> : <UserDashboard/>}
    </div>
  );
};

export default Dashboard;
