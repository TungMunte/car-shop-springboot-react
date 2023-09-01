import { useState } from "react";
import "../css/CarCard.css";
import axios from "axios";

function CommandCard(props) {
  function deleteCommand() {
    axios
      .delete(`http://localhost:8080/api/commands/${props.id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    props.deleteById(props.id);
  }

  function convertDate(number) {
    const date = new Date(number);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="row p-5">
      <div className="card card-stepper" style={{ borderRadius: "10px" }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              {props.completed === true && (
                <span className="lead fw-normal">
                  {`Your order has been delivered`}
                </span>
              )}
              {props.completed === false && (
                <span className="lead fw-normal">{`Your order is on the way`}</span>
              )}
            </div>
          </div>
          <hr className="my-4" />

          <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
            <span className="dot"></span>
            <hr className="flex-fill track-line" />
            <span className="dot"></span>
            <hr
              className={`flex-fill ${
                props.completed === true && "track-line"
              }`}
            />
            <span className="d-flex justify-content-center align-items-center big-dot dot">
              <i className="fa fa-check text-white"></i>
            </span>
          </div>

          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-column align-items-start">
              <span>{convertDate(props.date)}</span>
              <span>Order placed</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>{convertDate(props.date)}</span>
              <span>Order Dispatched</span>
            </div>
            <div className="d-flex flex-column align-items-end">
              {props.completed === true && (
                <span>{convertDate(props.date)}</span>
              )}
              {props.completed === true && <span>Delivered</span>}
            </div>
          </div>

          {(new Date().getDate() - new Date(props.date).getDate() === 0 ||
            new Date().getDate() - new Date(props.date).getDate() === 1) && (
            <button
              className="btn btn-primary mt-4 mb-4"
              onClick={deleteCommand}
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommandCard;
