import React, {FC, useMemo} from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {Home} from "@/routes/Home/index";
import {LoginPage} from "@/routes/LoginPage";
import {RegisterPage} from "@/routes/RegisterPage";
import {ProfilePage} from "@/routes/ProfilePage/index";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.component";
import {useAppDispatch} from "@/hooks/redux-hooks";
import {
  fetchUserDetails,
  selectIsLoadingUserDetails,
  selectUserDetails,
} from "@/store/User/User.slice";
import {useSelector} from "react-redux";
import PageLoader from "@/components/PageLoader/PageLoader";
import Dashboard from "@/routes/DashBoard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute role={"user"}>
        <ProfilePage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={"user"} redirectTo={"/login"}>
        <Dashboard/>
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

  return isLoading ? <PageLoader/> : <RouterProvider router={router}/>;
};

export default Router;
