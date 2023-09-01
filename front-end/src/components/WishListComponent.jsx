import axios from "axios";
import WishListCard from "../cards/WishListCard";
import { useAuth } from "../security/AuthContext";
import { useEffect, useState } from "react";

function WishListComponent() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => refreshWishList(), [currentPage]);

  function handlerCurrentPage(page) {
    setCurrentPage(page);
  }

  const authContext = useAuth();
  const username = authContext.usernameOrEmail;

  function refreshWishList() {
    axios
      .get(`http://localhost:8080/api/users/${username}/wishList`)
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
            <WishListCard id={car.id} price={car.price} type={car.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishListComponent;
