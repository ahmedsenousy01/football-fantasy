import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "@/routes/Home";
import { LoginPage } from "@/routes/LoginPage";
import { RegisterPage } from "@/routes/RegisterPage";
import { ProfilePage } from "@/routes/ProfilePage/index";

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
    element: <ProfilePage />,
  },
]);

const Router: FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
