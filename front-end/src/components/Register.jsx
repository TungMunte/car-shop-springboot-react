import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import axios from "axios";

function LoginComponent() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit() {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        username: username,
        password: password,
        name: name,
        email: email,
      }
    );
    if (response.status === 201) {
      setShowErrorMessage(false);
      navigate("/login");
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <section className="vh-150 gradient-custom">
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
                    Register Failed. Please check your information.
                  </div>
                )}
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your information
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

                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={handleNameChange}
                    />
                    <label className="form-label" for="typePasswordX">
                      Name
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={handleEmailChange}
                    />
                    <label className="form-label" for="typePasswordX">
                      Email
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
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
