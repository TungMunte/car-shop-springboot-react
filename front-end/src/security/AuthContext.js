import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
  //3: Put some state in the context
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [isAdmin, setAdmin] = useState(false);

  const [usernameOrEmail, setUsernameOrEmail] = useState(null);

  const [token, setToken] = useState(null);

  const [listCart, setListCart] = useState([]);

  async function login(usernameOrEmail, password) {
    try {
      const response = await executeJwtAuthenticationService(
        usernameOrEmail,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        if (usernameOrEmail === "admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        setUsernameOrEmail(usernameOrEmail);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function signin(response, usernameOrEmail) {
    if (response.status === 200) {
      const jwtToken = "Bearer " + response.data.accessToken;
      setAuthenticated(true);
      if (usernameOrEmail === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      setUsernameOrEmail(usernameOrEmail);
      setToken(jwtToken);

      apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = jwtToken;
        return config;
      });

      return true;
    }
  }

  function logout() {
    setAuthenticated(false);
    setAdmin(false);
    setUsernameOrEmail(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        signin,
        usernameOrEmail,
        token,
        isAdmin,
        listCart,
        setListCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
