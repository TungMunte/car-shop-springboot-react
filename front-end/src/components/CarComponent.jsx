import axios from "axios";
import CarCard from "../cards/CarCard";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function CarComponent() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => refreshCars(), [currentPage]);

  function handlerCurrentPage(page) {
    setCurrentPage(page);
  }

  const authContext = useAuth();

  function refreshCars() {
    axios
      .get(`http://localhost:8080/api/cars?pageNo=${currentPage}`)
      .then((response) => {
        console.log(response);
        setCars(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div
        className="container-fluid bg-trasparent my-4 p-3"
        style={{ position: "relative" }}
      >
        <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {cars.map((car) => (
            <CarCard id={car.id} price={car.price} type={car.type} />
          ))}
        </div>
      </div>
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
