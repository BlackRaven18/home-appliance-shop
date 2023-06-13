import { Navigate, } from "react-router-dom";
import UserDataManager from "../UserDataManager/UserDataManager";

interface ProtectedElementProps {
  element: JSX.Element;
  redirectPath: string;
}

const ProtectedElement = ({element, redirectPath}: ProtectedElementProps): JSX.Element => {
  const isAuthenticated = UserDataManager.getUserId() ? true : false;

  return isAuthenticated ? element : <Navigate to={redirectPath} />
}

export default ProtectedElement;