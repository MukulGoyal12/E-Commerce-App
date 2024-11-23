import { Navigate } from "react-router-dom";
import { withUser } from "../providers/withHOC";

const AuthRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default withUser(AuthRoute);
