import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

function UserComponent() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => refreshUsers(), [currentPage]);

  function handlerCurrentPage(page) {
    setCurrentPage(page);
    navigate(`/users/${page}`);
  }

  function refreshUsers() {
    if (page === undefined) {
      setCurrentPage(0);
    }
    axios
      .get(`http://localhost:8080/api/users?pageNo=${currentPage}`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul className="list-group list-group-light">
        {users.map((user) => {
          return (
            <li className="list-group-item ">
              <UserCard
                id={user.id}
                username={user.username}
                email={user.email}
              />
            </li>
          );
        })}
      </ul>
      <Pagination className="justify-content-center">
        <Pagination.Prev onClick={() => handlerCurrentPage(currentPage - 1)} />
        <Pagination.Item onClick={() => handlerCurrentPage(currentPage)}>
          {currentPage + 1}
        </Pagination.Item>
        <Pagination.Item onClick={() => handlerCurrentPage(currentPage + 1)}>
          {currentPage + 2}
        </Pagination.Item>
        <Pagination.Item onClick={() => handlerCurrentPage(currentPage + 2)}>
          {currentPage + 3}
        </Pagination.Item>
        <Pagination.Next onClick={() => handlerCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
}

export default UserComponent;
