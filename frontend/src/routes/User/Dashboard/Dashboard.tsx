import {FC} from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import ExplorePlayersCard from "@/components/dashboard-components/ExplorePlayersCard/ExplorePlayersCard";

const UserDashboard: FC = () => {
  return (
    <ProtectedRoute role={"user"}>
      <div className="container-fluid">
        <div className="row"><ExplorePlayersCard/></div>
      </div>
    </ProtectedRoute>
  )
}

export default UserDashboard;