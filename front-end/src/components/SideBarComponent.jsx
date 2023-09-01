import "../css/SidebarComponent.css";
import axios from "axios";
import CarCard from "../cards/CarCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

function SidebarComponent() {
  const [cars, setCars] = useState([]);
  const [price, setPrice] = useState(false);
  const [type, setType] = useState(false);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  useEffect(() => refreshCars(), [currentPage]);

  function handlerCurrentPage(page) {
    setCurrentPage(page);
    navigate(`/car/${page}`);
  }

  function refreshCars() {
    if (page === undefined) {
      axios
        .get(`http://localhost:8080/api/cars?pageNo=${0}`)
        .then((response) => setCars(response.data))
        .catch((error) => console.log(error));
    } else {
      axios
        .get(`http://localhost:8080/api/cars?pageNo=${currentPage}`)
        .then((response) => setCars(response.data))
        .catch((error) => console.log(error));
    }
  }

  async function getCarsByPrice(startPrice, endPrice) {
    await axios
      .get(`http://localhost:8080/api/cars/price/${startPrice}/${endPrice}`)
      .then((response) => {
        console.log(response);
        setCars(response.data);
      })
      .catch((error) => console.log(error));
  }

  async function getCarsByType(type) {
    await axios
      .get(`http://localhost:8080/api/cars/type/${type}`)
      .then((response) => {
        console.log(response);
        setCars(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto px-0">
          <div id="sidebar" className="collapse collapse-horizontal border-end">
            <div
              id="sidebar-nav"
              className="list-group border-0 rounded-0 text-sm-start min-vh-100"
            >
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start">
                <li className="dropdown">
                  <a
                    className="nav-link dropdown-toggle  text-truncate"
                    id="dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fs-5 bi-bootstrap"></i>
                    <span
                      className="ms-1 d-none d-sm-inline"
                      onClick={() => setPrice(true)}
                    >
                      Price
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu text-small shadow"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByPrice(5000, 10000)}
                      >
                        5000 - 10000
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByPrice(10000, 20000)}
                      >
                        10000 - 20000
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByPrice(20000, 30000)}
                      >
                        20000 - 30000
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a
                    className="nav-link dropdown-toggle  text-truncate"
                    id="dropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fs-5 bi-bootstrap"></i>
                    <span
                      className="ms-1 d-none d-sm-inline"
                      onClick={() => setType(true)}
                    >
                      Type
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu text-small shadow"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Elantra")}
                      >
                        Elantra
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("GMC Sierra")}
                      >
                        GMC Sierra
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("BMW")}
                      >
                        BMW
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Volkswagen")}
                      >
                        Volkswagen
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Ford")}
                      >
                        Ford
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Nissan")}
                      >
                        Nissan
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Hyundai")}
                      >
                        Hyundai
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Chevrolet")}
                      >
                        Chevrolet
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("Toyota")}
                      >
                        Toyota
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => getCarsByType("MERCEDES-BENZ")}
                      >
                        MERCEDES-BENZ
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main className="col ps-md-2 pt-2">
          <a
            data-bs-target="#sidebar"
            data-bs-toggle="collapse"
            className="border rounded-3 p-1 text-decoration-none collapsed"
            aria-expanded="false"
          >
            <i className="bi bi-list bi-lg py-2 p-1"></i> Filter
          </a>
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
            {price === false && type === false && (
              <Pagination className="justify-content-center">
                <Pagination.Prev
                  onClick={() => handlerCurrentPage(currentPage - 1)}
                />
                <Pagination.Item
                  onClick={() => handlerCurrentPage(currentPage)}
                >
                  {currentPage + 1}
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => handlerCurrentPage(currentPage + 1)}
                >
                  {currentPage + 2}
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => handlerCurrentPage(currentPage + 2)}
                >
                  {currentPage + 3}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => handlerCurrentPage(currentPage + 1)}
                />
              </Pagination>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SidebarComponent;
