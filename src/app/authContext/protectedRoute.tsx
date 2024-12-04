import { Navigate } from "react-router-dom";
import { useAuthContext } from "./authContextProps";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if user authorized, page will render, if not he will be navigate to /login
  return children;
};

export default ProtectedRoute;
