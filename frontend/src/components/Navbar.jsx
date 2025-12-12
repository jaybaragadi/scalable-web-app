import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        backgroundColor: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <strong>Scalable Web App</strong>
        </Link>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>
              Login
            </Link>
            <Link to="/register" style={{ color: "white" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
