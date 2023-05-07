import {FC} from "react";
import {useSelector} from "react-redux";
import {selectUserRole} from "@/store/User/User.slice";

const NotAuthorizedPage: FC = () => {
  const userRole = useSelector(selectUserRole)

  return (
    <div className="page-wrapper d-flex flex-column justify-content-center align-items-center h-100">
      <h1 className={"error-status-code"}>401</h1>
      <h3 className="muted display-6 text-center">Role "{userRole}" can't access this page</h3>
    </div>
  )
};

export default NotAuthorizedPage;