import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const isAdmin = authContext.isAdmin;

  function logout() {
    authContext.logout();
  }

  return (
    <header className=" border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="navbar-brand ms-2 fs-2 fw-bold text-black">
                  <Link className="nav-link" to="/car/0">
                    Let's Drive
                  </Link>
                </li>
              </ul>
            </div>

            <ul className="navbar-nav">
              <li className="nav-item me-2">
                {isAdmin && (
                  <Link className="nav-link" to="/users/0">
                    Users
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {isAdmin && (
                  <Link className="nav-link" to="/cars/0">
                    Cars
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAdmin && isAuthenticated && (
                  <Link className="nav-link" to="/wishList">
                    Wish List
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAdmin && isAuthenticated && (
                  <Link className="nav-link" to="/command">
                    History
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAdmin && isAuthenticated && (
                  <Link className="nav-link" to="/payment">
                    Cart
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAdmin && isAuthenticated && (
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAuthenticated && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item me-2">
                {!isAuthenticated && (
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <Link className="nav-link" to="/logout" onClick={logout}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
