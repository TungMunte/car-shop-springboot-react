import axios from "axios";
import { useState } from "react";
import { useAuth } from "../security/AuthContext";

function ReviewCard(props) {
  const [modify, setModify] = useState(false);
  const [rating, setRating] = useState(Number(props.rating));
  const [content, setContent] = useState(props.content);
  const authContext = useAuth();
  const isAdmin = authContext.isAdmin;
  const isAuthenticated = authContext.isAuthenticated;
  const usernameOrEmail = authContext.usernameOrEmail;

  function handleChange(event) {
    setContent(event.target.value);
  }

  function handlerModify() {
    setModify(!modify);
  }

  function handlerSave() {
    setModify(!modify);
    console.log(props.id);
    const headers = { Authorization: `${authContext.token}` };
    axios.put(
      `http://localhost:8080/api/reviews/${Number(props.id)}`,
      {
        id: props.id,
        content: content,
        rating: rating,
        userDto: props.userDto,
      },
      { headers }
    );
  }

  return (
    <div className="d-flex">
      <div className="left">
        <span>
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
            className="profile-pict-img img-fluid"
            alt=""
          />
        </span>
      </div>
      <div className="right">
        <h4>
          {props.username}
          <span className="gig-rating text-body-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1792 1792"
              width="15"
              height="15"
            >
              <path
                fill="currentColor"
                d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
              ></path>
            </svg>
            {rating / 2}
          </span>
        </h4>
        <div className="review-description mb-4">
          {!modify && <p>{content}</p>}
          {modify && (
            <div class="form-outline mb-4">
              <textarea
                class="form-control"
                rows="2"
                onChange={handleChange}
                value={content}
              />
            </div>
          )}
        </div>
        {(isAdmin || isAuthenticated) &&
          usernameOrEmail === props.username &&
          !modify && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlerModify}
            >
              modify
            </button>
          )}
        {modify && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handlerSave}
          >
            save
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
