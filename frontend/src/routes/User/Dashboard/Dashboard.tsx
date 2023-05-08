import {FC} from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import ExplorePlayersCard from "@/components/dashboard-cards/ExplorePlayersCard/ExplorePlayersCard";
import ManageTeamsCard from "@/components/dashboard-cards/ManageTeamsCard/ManageTeamsCard";

const UserDashboard: FC = () => {
  return (
    <ProtectedRoute role={"user"}>
      <div className="container-fluid">
        <div className="row">
          <ExplorePlayersCard/>
          <ManageTeamsCard/>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default UserDashboard;