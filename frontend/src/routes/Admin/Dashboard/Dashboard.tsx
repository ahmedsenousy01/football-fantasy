import {FC} from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import ExplorePlayersCard from "@/components/dashboard-components/ExplorePlayersCard/ExplorePlayersCard";
import EditUsersCard from "@/components/dashboard-components/EditUsersCard/EditUsersCard";

const AdminDashboard: FC = () => {
  console.warn("trying to access admin dashboard")

  return (
    <ProtectedRoute role={"admin"}>
      <div className="row">
        <ExplorePlayersCard/>
        <EditUsersCard/>
      </div>
    </ProtectedRoute>
  )
}

export default AdminDashboard;