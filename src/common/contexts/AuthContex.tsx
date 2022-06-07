import axios, { AxiosResponse } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IAdmin } from '../interfaces/interfaces';

type AuthContextType = {
  admin?: IAdmin;
  // loading: boolean;
  // error?: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [admin, setAdmin] = useState<IAdmin>();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/auth/get`,
          {
            cancelToken: source.token,
            withCredentials: true,
          }
        );

        if (response.data) {
          setAdmin({
            id: response.data.id,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            displayName: response.data.display_name,
            email: response.data.email,
            passwordChanged: response.data.password_changed,
            role: response.data.role,
          });
        }

        setLoadingInitial(false);
      } catch (error) {
        throw error;
      }
    };

    fetchUser();

    return () => {
      source.cancel();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/admin/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const memoedValue = useMemo(
    () => ({
      admin,
      // loading,
      login,
      logout,
    }),
    [admin]
    // [driver, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

// Only export the `useAuth` hook instead of the context.
// Use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
