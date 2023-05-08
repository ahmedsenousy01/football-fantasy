import { FC } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import ExplorePlayersCard from "@/components/dashboard-cards/ExplorePlayersCard/ExplorePlayersCard";
import EditUsersCard from "@/components/dashboard-cards/EditUsersCard/EditUsersCard";

const AdminDashboard: FC = () => {
  console.warn("trying to access admin dashboard");

  return (
    <ProtectedRoute role={"admin"}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <ExplorePlayersCard />
          <EditUsersCard />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
