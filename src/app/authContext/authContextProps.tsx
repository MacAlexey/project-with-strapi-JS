import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API, BEARER } from "../../constants";
import { getToken, removeToken } from "../../helpers";

//потом надо заменить на старый type который я использовал ранее в файле Type вроде
interface UserType {
  id: string | number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextProps {
  user: UserType | undefined;
  isLoading: boolean;
  setUser: (user: UserType | undefined) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  isLoading: false,
  setUser: () => {},
  logout: () => {},
});

// custom hook
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false); //to display the loading status while actions are being performed (e.g. login, data request).
  const [isInitialized, setIsInitialized] = useState(true); //isInitialized используется для предотвращения отображения интерфейса до завершения проверки токена

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchLoggedInUser(token).finally(() => setIsInitialized(false));
    } else {
      setIsInitialized(false);
    }
  }, []);

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error fetching user data");
      }

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error(
        "Error retrieving user data:", //Ошибка при получении данных пользователя
        error instanceof Error ? error.message : error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(undefined);
  };

  // can add Loading Sticker, Icon etc.
  // без этого при обновлении сайта будет выскакивать не залоггированный хидер
  if (isInitialized) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
