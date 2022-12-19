import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function Protected({ allowedRoles }) {
  const { isLogged, userRole } = useSelector((state) => state.auth);

  return isLogged ? (
    (() => allowedRoles?.includes(userRole)) ? (
      <Outlet />
    ) : (
      <Navigate to="/" replace={true} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
