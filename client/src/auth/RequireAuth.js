import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../state/authSlice";

export const RequireAuth = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/bejelentkezes" replace />;
  }

  return children;
};
