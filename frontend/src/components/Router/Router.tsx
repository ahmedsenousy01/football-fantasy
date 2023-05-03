import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '@/routes/Home';
import { LoginPage } from '@/routes/LoginPage';
import {RegisterPage} from "@/routes/RegisterPage";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage/>
	}
]);

const Router: FC = () => {
	return <RouterProvider router={router} />;
};

export default Router;
