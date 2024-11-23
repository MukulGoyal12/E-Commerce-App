import { Navigate } from "react-router-dom";
import { withUser } from "../providers/withHOC";

const LoggedInRoute = ({ children, user }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default withUser(LoggedInRoute);
