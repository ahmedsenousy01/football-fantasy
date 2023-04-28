import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "../routes/Home";
import {FC} from "react";

const router = createBrowserRouter([{
  path:"/",
  element: <Home/>,
}]);


const Router:FC = ()=>{
  return(
      <RouterProvider router={router}/>
  );
}
export default Router;
