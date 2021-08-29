import React from "react";

export default function HistoryComponent({
  id,
  imageUrl,
  vehicleName,
  rentStart,
  rentFinish,
  price,
  status,
}) {
  return (
    <>
      <div
        className="d-flex history-item align-items-center"
        id={"history" + id}
      >
        <div className="d-flex flex-grow-7 history-item-row ">
          <div
            className="history-test"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          {/* <img alt="" className="history-image" src={imageUrl}></img> */}
          <div className="d-flex flex-column history-detail">
            <div className="history-item-title">{vehicleName}</div>
            <p className="">{rentStart + " to " + rentFinish}</p>
            <div className="prepayment-price">Prepayment : Rp. {price}</div>
            <div
              className={
                status ? "history-status-true" : "history-status-false"
              }
            >
              {status ? "Has been returned" : ""}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center history-checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            id={"select" + id}
          />
        </div>
      </div>
    </>
  );
}
