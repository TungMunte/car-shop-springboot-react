import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserEditCard() {
  const { ID } = useParams();
  const authContext = useAuth();
  const [id, setId] = useState(Number(ID));
  const [isClicked, setIsClicked] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => refreshProfile(), []);

  function refreshProfile() {
    const headers = { Authorization: `${authContext.token}` };
    axios
      .get(`http://localhost:8080/api/users/${Number(ID)}`)
      .then((response) => {
        console.log(response);
        setId(response.data.id);
        setEmail(response.data.email);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlerOnClick() {
    setIsClicked(!isClicked);
  }

  function handleModify() {
    axios
      .put(`http://localhost:8080/api/users/${Number(ID)}`, {
        id: id,
        email: email,
        username: username,
      })
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

export default UserEditCard;
