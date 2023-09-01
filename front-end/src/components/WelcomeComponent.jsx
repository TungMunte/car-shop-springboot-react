import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";

function WelcomeComponent() {
  const { username } = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5">call hello world</button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
