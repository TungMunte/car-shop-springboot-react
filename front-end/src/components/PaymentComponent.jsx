import "../css/PaymentComponent.css";
import { useAuth } from "../security/AuthContext";
import PaymentCard from "../cards/PaymentCard";
import Button from "react-bootstrap/Button";
import axios from "axios";

function PaymentComponent() {
  const authContext = useAuth();
  const listCart = authContext.listCart;
  const setListCart = authContext.setListCart;
  const username = authContext.usernameOrEmail;
  let sum = 0;
  let numberOfCart = 0;

  function handlerApply() {
    const headers = { Authorization: `${authContext.token}` };
    listCart.map((cart) => {
      axios
        .post(
          `http://localhost:8080/api/users/${username}/commands`,
          {
            date: new Date(),
            completed: false,
            id_car: cart.id,
            username: username,
          },
          { headers }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
    setListCart([]);
  }

  const deleteById = (id) => {
    setListCart((commands) => {
      return commands.filter((_, index) => index !== id);
    });
  };

  return (
    <div className="container mt-4 p-0">
      <div className="row px-md-4 px-2 pt-4">
        <div className="col-lg-8">
          <p className="pb-2 fw-bold">Order</p>
          {listCart.map((cart, id) => {
            sum = sum + cart.price;
            numberOfCart++;
            return (
              <PaymentCard
                id={id}
                type={cart.type}
                price={cart.price}
                deleteById={deleteById}
              />
            );
          })}
        </div>
        <div className="col-lg-4 payment-summary">
          <p className="fw-bold pt-lg-0 pt-4 pb-2">Payment Summary</p>
          <div className="card px-md-3 px-2 pt-4">
            <div className="d-flex flex-column ">
              <div className="d-flex justify-content-between py-3">
                <small className="text-muted">Order Summary</small>
                <p>${sum}</p>
              </div>
              <div className="d-flex justify-content-between pb-3">
                <small className="text-muted">Delivery Service</small>
                <p>${22 * numberOfCart} </p>
              </div>
              <div className="d-flex justify-content-between">
                <small className="text-muted">Total Amount</small>
                <p>${22 * numberOfCart + sum}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between  justify-content-md-end mb-4 mt-4">
              <Button variant="primary" onClick={handlerApply}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentComponent;
