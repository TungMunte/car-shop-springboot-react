import axios from "axios";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

function CarComponent() {
  const { page } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(Number(page));

  useEffect(() => refreshCars(), [currentPage]);

  function handlerCurrentPage(page) {
    setCurrentPage(page);
    navigate(`/cars/${page}`);
  }

  const authContext = useAuth();

  function refreshCars() {
    if (page === undefined) {
      setCurrentPage(0);
    }
    axios
      .get(`http://localhost:8080/api/cars?pageNo=${currentPage}`)
      .then((response) => {
        console.log(cars);
        setCars(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul className="list-group list-group-light">
        {cars.map((car) => {
          console.log(car);
          return (
            <li className="list-group-item ">
              <CarCard id={car.id} type={car.type} price={car.price} />
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

export default CarComponent;
