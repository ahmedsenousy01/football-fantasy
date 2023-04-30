import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from '@/routes/Home';
import { Login } from '@/routes/Login';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

const Router: FC = () => {
	return <RouterProvider router={router} />;
};

export default Router;
