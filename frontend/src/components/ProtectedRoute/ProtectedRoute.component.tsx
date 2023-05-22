import {FC, ReactNode, useMemo} from "react";
import {useSelector} from "react-redux";
import {
  selectIsLoadingUserDetails,
  selectUserRole,
} from "@/store/User/User.slice";
import NotAuthorizedPage from "@/routes/NotAuthorizedPage/NotAuthorizedPage.component";
import PageLoader from "@/components/PageLoader/PageLoader";

interface ProtectedRouteProps {
  role: string;
  redirectTo?: string;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const userRole = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoadingUserDetails);

  const authorizedRoles = useMemo(
    () =>
      props.role === "user"
        ? ["user", "admin"]
        : props.role === "admin"
          ? ["admin"]
          : [],
    [props.role]
  );
  console.log("allowed roles: ", authorizedRoles);

  const authorized: boolean = authorizedRoles.includes(userRole ?? "");

  if (!isLoading && !authorized && props.redirectTo !== undefined) {
    window.location.replace(props.redirectTo);
  }

  return (
    <>
      {isLoading ? (
        <PageLoader/>
      ) : authorized ? (
        props.children
      ) : (
        <NotAuthorizedPage/>
      )}
    </>
  );
};

export default ProtectedRoute;
