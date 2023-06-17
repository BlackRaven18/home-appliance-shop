import { Navigate, } from "react-router-dom";
import UserDataManager from "../UserDataManager/UserDataManager";

interface ProtectedElementProps {
  element: JSX.Element;
  redirectPath: string;
  allowLoggedInUser: boolean;
}

const ProtectedElement = (
  { element, redirectPath, allowLoggedInUser }: ProtectedElementProps): JSX.Element => {

  const isAuthenticated = UserDataManager.isLogged();

  if (allowLoggedInUser) {
    return isAuthenticated ? element : <Navigate to={redirectPath} />
  } else {
    return isAuthenticated? <Navigate to={redirectPath}/> : element;
  }
}

export default ProtectedElement;