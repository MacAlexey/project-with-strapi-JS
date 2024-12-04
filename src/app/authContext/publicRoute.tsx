import { Navigate } from "react-router-dom";
import { useAuthContext } from "./authContextProps";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
