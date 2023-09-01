import "../css/PaymentComponent.css";
import { useState } from "react";

function PaymentCard(props) {
  function handlerDelete() {
    props.deleteById(props.id);
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
    <div className="card mt-4 mb-4">
      <div className="table-responsive px-md-4 px-2 pt-3">
        <table className="table table-borderless">
          <tbody>
            <tr className="border-bottom">
              <td>
                <div className="d-flex align-items-center">
                  <div>
                    <img className="pic" src={loadImage()} alt="" />
                  </div>
                  <div className="ps-3 d-flex flex-column justify-content">
                    <p className="fw-bold">{props.type}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex">
                  <p className="pe-3">
                    <span className="red">${props.price}</span>
                  </p>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="round">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                      onClick={handlerDelete}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentCard;
