import { useNavigate } from "react-router-dom";
import { LogOut, Bell, ClipboardList, Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-circle">
          <ClipboardList size={28} />
        </div>

        <div>
          <h2>Student Task Manager</h2>
          <p>{today}</p>
        </div>
      </div>

      <div className="nav-right">
        <button
          className="theme-btn"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="notification">
          <Bell size={22} />
        </div>

        <div className="user-profile">
          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>

          <div>
            <h4>{user?.name}</h4>
            <small>Welcome back 👋</small>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
