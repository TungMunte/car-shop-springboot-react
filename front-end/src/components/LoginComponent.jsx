import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function LoginComponent() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      usernameOrEmail: username,
      password: password,
    });
    if (response.status === 200) {
      authContext.signin(response, username);
      navigate("/");
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1 rem" }}
            >
              <div className="card-body p-5 text-center">
                {showErrorMessage && (
                  <div className="errorMessage">
                    Authentication Failed. Please check your credentials.
                  </div>
                )}
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <label className="form-label" for="typeEmailX">
                      User Name
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={handlePasswordChange}
                    />
                    <label className="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginComponent;
