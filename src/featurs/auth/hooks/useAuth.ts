import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsAuthenticated, selectToken } from "../slices/auth.slice";

export const useCurrentUser = () => {
  return useSelector(selectCurrentUser);
};

export const useIsAuthenticated = () => {
  return useSelector(selectIsAuthenticated);
};

export const useToken = () => {
  return useSelector(selectToken);
};

export const useAuth = () => {
  const user = useCurrentUser();
  const isAuthenticated = useIsAuthenticated();
  const token = useToken();

  return {
    user,
    isAuthenticated,
    token,
  };
};
