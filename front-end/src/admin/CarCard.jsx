import { useNavigate } from "react-router-dom";

function CarCard(props) {
  const navigate = useNavigate();

  function handlerOnClick() {
    navigate(`/editCar/${props.id}`);
  }

  function loadImage() {
    if (props.type === "Elantra") {
      return "https://imgd.aeplcdn.com/0x0/n/cw/ec/41138/elantra-exterior-right-front-three-quarter.jpeg";
    }
    if (props.type === "GMC Sierra") {
      return "https://images.squarespace-cdn.com/content/v1/603f9fc6a2120f0be59de63c/92ec0f65-93bc-4bf9-86ba-7821f3f60f5b/BW21_GMC+1500_Mobile-temp.jpg";
    }
    if (props.type === "BMW") {
      return "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/2023/230201_BMW_Group_BMW_i4eDrive40.png";
    }
    if (props.type === "Volkswagen") {
      return "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Taigun/1981/1677915119518/front-left-side-47.jpg";
    }
    if (props.type === "Ford") {
      return "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/legacy/nameplate/suvs/21_FRD_ECO_40421_v2_Segment_pg.jpg/_jcr_content/renditions/cq5dam.web.768.768.jpeg";
    }
    if (props.type === "Nissan") {
      return "https://media.ed.edmunds-media.com/nissan/rogue/2023/oem/2023_nissan_rogue_4dr-suv_platinum_fq_oem_1_1280.jpg";
    }
    if (props.type === "Hyundai") {
      return "https://media.ed.edmunds-media.com/hyundai/palisade/2023/oem/2023_hyundai_palisade_4dr-suv_calligraphy_fq_oem_1_1600.jpg";
    }
    if (props.type === "Chevrolet") {
      return "https://image.cnbcfm.com/api/v1/image/105232079-2018-Chevrolet-Camaro-ZL1-033.jpg?v=1679502991";
    }
    if (props.type === "Toyota") {
      return "https://imgd.aeplcdn.com/0x0/n/cw/ec/139739/land-cruiser-exterior-right-front-three-quarter.jpeg?isig=0";
    }
    if (props.type === "MERCEDES-BENZ") {
      return "https://www.carmag.co.za/wp-content/uploads/2023/01/Mercedes-Benz-C63_S_AMG_E_Performance-2023-1600-02-800x480.webp";
    }
  }

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex align-items-start">
        <img
          src={loadImage()}
          alt=""
          style={{ width: "45px", height: "45px" }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">{props.type}</p>
          <p className="text-muted mb-0">{props.price}</p>
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

export default CarCard;
