/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getVehicle } from "../utils/https/Vehicles";
import arrow from "../assets/img/icon/arrow-left.png";
import { withRouter } from "react-router";

function HistoryComponent({
  id,
  vehicleId,
  vehicleName,
  rentStart,
  rentFinish,
  price,
  returned,
  userPaid,
  sellerPaid,
  authLevel,
  history,
}) {
  const [image, setImage] = useState("");
  useEffect(() => {
    getVehicle({ id: vehicleId }).then((data) => {
      setImage(data.data.result[0].picture);
    });
  }, []);

  if (!userPaid && authLevel === 3)
    return (
      <div
        onClick={() => history.push(`/payment/${id}`)}
        className="d-flex history-item align-items-center"
      >
        <div className="d-flex flex-grow-7 align-items-center">
          <div className="flex-fill">
            Please finish your payment for {vehicleName}
          </div>
          <img alt="" className="flip-image" src={arrow}></img>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="radio"
            value={id}
            name="delete"
          />
        </div>
      </div>
    );
  if (userPaid && authLevel !== 3 && !sellerPaid)
    return (
      <div
        onClick={() => history.push(`/payment/${id}`)}
        className="d-flex history-item align-items-center"
      >
        <div className="d-flex flex-grow-7 align-items-center">
          <div className="flex-fill">Confirm Payment For {vehicleName}</div>
          <img alt="" className="flip-image" src={arrow}></img>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="radio"
            value={id}
            name="delete"
          />
        </div>
      </div>
    );
  if (sellerPaid)
    return (
      <>
        <div className="d-flex history-item align-items-center">
          <div className="d-flex flex-grow-7 align-items-center">
            <div className="flex-fill">Your payment has been confirmed!</div>
          </div>
          <div className="d-flex justify-content-center history-checkbox"></div>
        </div>
        <div
          className="d-flex history-item align-items-center"
          id={"history" + id}
        >
          <div className="d-flex flex-grow-7 history-item-row ">
            <div
              className="history-test"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
              }}
            />
            <div className="d-flex flex-column history-detail">
              <div className="history-item-title">{vehicleName}</div>
              <p className="">{rentStart + " to " + rentFinish}</p>
              <div className="prepayment-price">Prepayment : Rp. {price}</div>
              <div
                className={
                  returned ? "history-status-true" : "history-status-false"
                }
              >
                {returned ? "Has been returned" : "Has Not been Returned"}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center history-checkbox">
            <input
              className="form-check-input"
              type="radio"
              value={id}
              id={"select" + id}
              name="delete"
            />
          </div>
        </div>
      </>
    );
  else return "";
}
export default withRouter(HistoryComponent);
