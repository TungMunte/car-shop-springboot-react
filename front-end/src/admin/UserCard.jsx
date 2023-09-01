import { useNavigate } from "react-router-dom";

function UserCard(props) {
  const navigate = useNavigate();
  function handlerOnClick() {
    navigate(`/editUser/${props.id}`);
  }

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-start">
        <img
          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{props.username}</p>
          <p className="text-muted mb-0">{props.email}</p>
        </div>
      </div>
      <div className="d-flex align-items-end">
        <button
          type="button"
          className="btn btn-primary btn-rounded btn-sm"
          onClick={handlerOnClick}
        >
          Modify
        </button>
      </div>
    </div>
  );
}

export default UserCard;
