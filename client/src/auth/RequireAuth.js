import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../state/authSlice";

export const RequireAuth = ({ component }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to="/bejelentkezes" replace />;
  }

  return component;
};
