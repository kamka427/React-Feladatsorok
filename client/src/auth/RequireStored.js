import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectLoggedInUser } from "../state/authSlice";
import { selectTasklist } from "../state/tasklistSlice";

export const RequireStored = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const storedTasklist = useSelector(selectTasklist);

  if (!user) {
    return <Navigate to="/bejelentkezes" replace />;
  }
  if (!storedTasklist) {
    return <Navigate to="/feladatsoraim" replace />;
  }

  return children ? children : <Outlet />;
};
