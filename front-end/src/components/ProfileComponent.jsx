import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../security/AuthContext";

function ProfileComponent() {
  const authContext = useAuth();
  const [isClicked, setIsClicked] = useState(true);
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("test");
  const [username, setUsername] = useState("test");

  useEffect(() => refreshProfile(), []);

  function refreshProfile() {
    const headers = { Authorization: `${authContext.token}` };
    axios
      .get(
        `http://localhost:8080/api/users/username/${authContext.usernameOrEmail}`,
        { headers }
      )
      .then((response) => {
        console.log(response);
        setId(response.data.id);
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
        setId(1);
        setEmail("agallego9@pbs.org");
        setUsername("admin");
      });
  }

  function handlerOnClick() {
    setIsClicked(!isClicked);
  }

  function handleModify() {
    const headers = { Authorization: `${authContext.token}` };
    axios
      .put(
        `http://localhost:8080/api/users/${id}`,
        {
          id: id,
          email: email,
          username: username,
        },
        { headers }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setIsClicked(!isClicked);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
    console.log(username);
  }
  return (
    <div>
      <ul className="list-group list-group-light">
        <li className="list-group-item ">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-start">
              <img
                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                {isClicked && <p className="fw-bold mb-1">{username}</p>}
                {isClicked && <p className="text-muted mb-0">{email}</p>}
                {!isClicked && (
                  <ul className="list-group list-group-light">
                    <li>
                      <input
                        className="fw-bold mb-1"
                        placeholder={"test"}
                        value={username}
                        onChange={handleUsername}
                      />
                    </li>
                    <li>
                      <input
                        className="text-muted mb-0"
                        placeholder={"test"}
                        value={email}
                        onChange={handleEmail}
                      />
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="d-flex align-items-end">
              {isClicked && (
                <button
                  type="button"
                  className="btn btn-primary btn-rounded btn-sm"
                  onClick={handlerOnClick}
                >
                  Modify
                </button>
              )}
              {!isClicked && (
                <button
                  type="button"
                  className="btn btn-success btn-rounded btn-sm"
                  onClick={handleModify}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProfileComponent;
