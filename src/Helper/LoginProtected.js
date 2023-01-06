import { Navigate, Outlet } from "react-router-dom";
export const LoginProtected = ({
  isLogged,
  redirectPath = '/',
}) => {
  if (!isLogged) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet/>;
};
