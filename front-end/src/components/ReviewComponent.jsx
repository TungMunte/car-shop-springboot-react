import "../css/ReviewComponent.css";
import axios from "axios";
import ReviewCard from "../cards/ReviewCard";
import { useAuth } from "../security/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/CarCard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ReviewComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = authContext.isAuthenticated;

  const { id } = useParams();
  const [car, setCar] = useState({ type: "demo", price: 5000 });
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState();
  const [content, setContent] = useState("");
  const [newReview, setNewReview] = useState(false);

  useEffect(() => refreshReviews(), []);

  function refreshReviews() {
    axios
      .get(`http://localhost:8080/api/cars/${Number(id)}`)
      .then((response) => {
        console.log(response);
        setCar(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8080/api/reviews/car/${Number(id)}`)
      .then((response) => {
        console.log(response);
        setReviews(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    console.log(isAuthenticated);
    if (isAuthenticated === true) {
      setNewReview(!newReview);
    }
  };

  function handlerLogin() {
    navigate("/login");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const reviewToInsert = {
      content: event.currentTarget.elements.contentInput.value,
      rating: Number(event.currentTarget.elements.numberInput.value) * 2,
      id_car: Number(id),
      username: authContext.usernameOrEmail,
    };
    const headers = { Authorization: `${authContext.token}` };
    axios.post(
      "http://localhost:8080/api/reviews",
      {
        content: event.currentTarget.elements.contentInput.value,
        rating: Number(event.currentTarget.elements.numberInput.value) * 2,
        id_car: Number(id),
        username: authContext.usernameOrEmail,
      },
      { headers }
    );
    setReviews((reviews) => [...reviews, reviewToInsert]);
    setNewReview(!newReview);
  }

  function loadImage() {
    if (car.type === "Elantra") {
      return "https://imgd.aeplcdn.com/0x0/n/cw/ec/41138/elantra-exterior-right-front-three-quarter.jpeg";
    }
    if (car.type === "GMC Sierra") {
      return "https://images.squarespace-cdn.com/content/v1/603f9fc6a2120f0be59de63c/92ec0f65-93bc-4bf9-86ba-7821f3f60f5b/BW21_GMC+1500_Mobile-temp.jpg";
    }
    if (car.type === "BMW") {
      return "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/2023/230201_BMW_Group_BMW_i4eDrive40.png";
    }
    if (car.type === "Volkswagen") {
      return "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Taigun/1981/1677915119518/front-left-side-47.jpg";
    }
    if (car.type === "Ford") {
      return "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/legacy/nameplate/suvs/21_FRD_ECO_40421_v2_Segment_pg.jpg/_jcr_content/renditions/cq5dam.web.768.768.jpeg";
    }
    if (car.type === "Nissan") {
      return "https://media.ed.edmunds-media.com/nissan/rogue/2023/oem/2023_nissan_rogue_4dr-suv_platinum_fq_oem_1_1280.jpg";
    }
    if (car.type === "Hyundai") {
      return "https://media.ed.edmunds-media.com/hyundai/palisade/2023/oem/2023_hyundai_palisade_4dr-suv_calligraphy_fq_oem_1_1600.jpg";
    }
    if (car.type === "Chevrolet") {
      return "https://image.cnbcfm.com/api/v1/image/105232079-2018-Chevrolet-Camaro-ZL1-033.jpg?v=1679502991";
    }
    if (car.type === "Toyota") {
      return "https://imgd.aeplcdn.com/0x0/n/cw/ec/139739/land-cruiser-exterior-right-front-three-quarter.jpeg?isig=0";
    }
    if (car.type === "MERCEDES-BENZ") {
      return "https://www.carmag.co.za/wp-content/uploads/2023/01/Mercedes-Benz-C63_S_AMG_E_Performance-2023-1600-02-800x480.webp";
    }
  }

  return (
    <div className="container">
      <div className="card h-100 shadow-sm">
        <img src={loadImage()} className="card-img-top" alt="..." />
        <div className="label-top shadow-sm">{car.type}</div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <div className="float-start badge rounded-pill bg-success">
              {car.price}&euro;
            </div>
          </div>
          <div className="text-center my-2">
            <Button variant="primary" onClick={handleShow}>
              Cart
            </Button>
          </div>
          <div className="text-center my-2 ">
            <Button variant="danger" onClick={handleShow}>
              WishList
            </Button>

            {!isAuthenticated && (
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>Please login</Modal.Header>
                <Modal.Footer>
                  <Button variant="primary" onClick={handlerLogin}>
                    Login
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>

      <div id="reviews" className="review-section"></div>

      <div className="review-list">
        <ul>
          {reviews.map((review) => (
            <li>
              <ReviewCard
                id={review.id}
                content={review.content}
                username={review.username}
                rating={review.rating}
              />
            </li>
          ))}
          <li>
            {newReview && (
              <form onSubmit={handleSubmit}>
                <div>
                  <div class="form-outline mb-4">
                    <label className="form-label">Content</label>
                    <textarea
                      class="form-control"
                      rows="2"
                      placeholder={content}
                      id="contentInput"
                    />
                  </div>
                  <div class="form-outline">
                    <label className="form-label">Rating</label>
                    <input
                      type="text"
                      id="numberInput"
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-danger mb-4 mt-4">
                  Submit
                </button>
              </form>
            )}
          </li>
        </ul>
        <Button variant="primary" onClick={handleShow}>
          add new review
        </Button>
      </div>
    </div>
  );
}

export default ReviewComponent;
