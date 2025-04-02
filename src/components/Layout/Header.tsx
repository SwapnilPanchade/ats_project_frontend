import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          ATS System
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-200">
                    Dashboard
                  </Link>
                </li>
                {user.role === "organization" && (
                  <li>
                    <Link to="/recruiters" className="hover:text-blue-200">
                      Recruiters
                    </Link>
                  </li>
                )}
                {user.role === "recruiter" && (
                  <li>
                    <Link to="/cvs" className="hover:text-blue-200">
                      CVs
                    </Link>
                  </li>
                )}
                {user.role === "candidate" && (
                  <li>
                    <Link to="/applications" className="hover:text-blue-200">
                      My Applications
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/profile" className="hover:text-blue-200">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-200">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
