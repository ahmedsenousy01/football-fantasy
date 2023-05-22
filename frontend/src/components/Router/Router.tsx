import React, { FC, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/routes/Home/index";
import { LoginPage } from "@/routes/LoginPage";
import { RegisterPage } from "@/routes/RegisterPage";
import { ProfilePage } from "@/routes/ProfilePage/index";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import {
  fetchUserDetails,
  selectIsLoadingUserDetails,
  selectUserDetails,
} from "@/store/User/User.slice";
import { useSelector } from "react-redux";
import PageLoader from "@/components/PageLoader/PageLoader";
import Dashboard from "@/routes/DashBoard/Dashboard";
import { PlayersPage } from "@/routes/PlayersPage";
import { PlayerPage } from "@/routes/PlayerPage";
import TeamPage from "@/routes/TeamPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute role={"user"}>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/players/:page",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <PlayersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/player/:id",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <PlayerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/team",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <TeamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute role={"admin"}>
        <></>
      </ProtectedRoute>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <></>
      </ProtectedRoute>
    ),
  },
]);

const Router: FC = () => {
  const dispatch = useAppDispatch();
  const userDetails = useSelector(selectUserDetails);
  const isLoading = useSelector(selectIsLoadingUserDetails);

  useMemo(() => {
    if (userDetails === undefined) {
      dispatch(fetchUserDetails());
    }
  }, []);

  return isLoading ? <PageLoader /> : <RouterProvider router={router} />;
};

export default Router;
