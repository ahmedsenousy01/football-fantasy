import {FC, ReactNode} from "react";

interface ProtectedRouteProps{
  role: string;
  children: ReactNode;
}

const ProtectedRoute:FC<ProtectedRouteProps> = (props) => {
  return(
    <>
      {props.children}
    </>
  )
}