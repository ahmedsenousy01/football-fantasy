import React, { FC, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/routes/Home/index";
import { LoginPage } from "@/routes/LoginPage";
import { RegisterPage } from "@/routes/RegisterPage";
import { ProfilePage } from "@/routes/ProfilePage/index";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { fetchUserDetails, selectUserDetails } from "@/store/User/User.slice";
import { useSelector } from "react-redux";
import Dashboard from "@/routes/DashBoard/Dashboard";
import { PlayersPage } from "@/routes/PlayersPage";
import { PlayerPage } from "@/routes/PlayerPage";
import TeamPage from "@/routes/TeamPage";
import Leaderboard from "@/routes/Leaderboard/Leaderboard.component";
import Page from "@/components/Page/Page.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <Home />
      </Page>
    ),
  },
  {
    path: "/login",
    element: (
      <Page>
        <LoginPage />
      </Page>
    ),
  },
  {
    path: "/register",
    element: (
      <Page>
        <RegisterPage />
      </Page>
    ),
  },
  {
    path: "/profile",
    element: (
      <Page>
        <ProtectedRoute role={"user"}>
          <ProfilePage />
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Page>
        <ProtectedRoute role={"user"} redirectTo={"/login"}>
          <Dashboard />
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/players/:page",
    element: (
      <Page>
        <ProtectedRoute role={"user"} redirectTo={"/login"}>
          <PlayersPage />
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/player/:id",
    element: (
      <Page>
        <ProtectedRoute role={"user"} redirectTo={"/login"}>
          <PlayerPage />
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/team",
    element: (
      <Page>
        <ProtectedRoute role={"user"} redirectTo={"/login"}>
          <TeamPage />
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/users",
    element: (
      <Page>
        <ProtectedRoute role={"admin"}>
          <></>
        </ProtectedRoute>
      </Page>
    ),
  },
  {
    path: "/leaderboard",
    element: (
      <Page>
        <ProtectedRoute role={"user"} redirectTo={"/login"}>
          <Leaderboard />
        </ProtectedRoute>
      </Page>
    ),
  },
]);

const Router: FC = () => {
  const dispatch = useAppDispatch();
  const userDetails = useSelector(selectUserDetails);

  useMemo(() => {
    if (userDetails === undefined) {
      dispatch(fetchUserDetails());
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default Router;
