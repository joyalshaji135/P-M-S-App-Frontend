import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password, role) => {
    if (email && password) {
      const loggedInUser = { email, role };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      switch (role) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Team Member":
          navigate("/team-member-dashboard");
          break;
        case "Team Manager":
          navigate("/team-manager-dashboard");
          break;
        case "Company Owner":
          navigate("/company-owner-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
