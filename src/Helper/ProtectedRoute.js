import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = ({
  isOrdered,
  orderStatus,
  redirectPath = "/",
}) => {
  if (orderStatus === "false" && isOrdered === "false") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
