import "../css/CommandComponent.css";
import CommandCard from "../cards/CommandCard";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

function CommandComponent() {
  const authContext = useAuth();
  const username = authContext.usernameOrEmail;
  const [onProcessCommands, setOnProcessCommands] = useState([]);

  useEffect(() => {
    refreshCommands();
  }, []);

  function refreshCommands() {
    axios
      .get(`http://localhost:8080/api/users/${username}/onProcessCommands`)
      .then((response) => {
        console.log(response.data);
        setOnProcessCommands(response.data);
      })
      .catch((error) => console.log(error));
  }

  const deleteById = (id) => {
    setOnProcessCommands((commands) => {
      return commands.filter((command) => command.id !== id);
    });
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center h-100 me-5">
        {onProcessCommands.map((command) => {
          return (
            <CommandCard
              id={command.id}
              completed={command.completed}
              date={command.date}
              deleteById={deleteById}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CommandComponent;
