import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import { Link } from "react-router-dom";

class Payment extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="reserve-container">
          <div className="reservation-title">
            <Link to="/">
              <img src={backIcon} alt="" />
            </Link>
            <span>Payment</span>
          </div>
          <section
            className="d-flex flex-column
          justify-content-center
          flex-xl-row mt-5
          "
          >
            <div className="payment-pic">
              <div className="d-flex justify-content-center">
                <img
                  className="payment-pic"
                  alt=""
                  src={
                    "https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg"
                  }
                />
              </div>
            </div>
            <div className="product-reserve payment-title-container ">
              <p className="reserve-vehicle-name">
                Fixie - Gray Only <br />
                <span>Yogyakarta</span>
              </p>
              <p className="no-prepayment">No Prepayment</p>
              <p className="booking-code">#FG1209878YZS</p>
              <button className="booking-code-btn">Copy Booking Code</button>
            </div>
          </section>
          <section className="payment-main pt-5">
            <div className="d-flex justify-content-between payment-row-1">
              <div className="payment-quantity">Quantity: 2 Bikes</div>
              <div className="reservation-date">
                Reservation Date: Jan 18-20 2021
              </div>
            </div>
            <div className="d-flex justify-content-between payment-row-2">
              <div className="order-details-container ">
                <p className="order-details-title">Order details</p>
                <div className="order-details">
                  <div>1 bike : Rp. 64000</div>
                  <div>1 bike : Rp. 64000</div>
                </div>
                <p className="order-details-total fw-bold">Total : 128.000</p>
              </div>
              <div className="payer-identity-container">
                <p className="payer-identity-title">Identity :</p>
                <div className="payer-identity">
                  <div>Identity : Samantha Doe (+6290987682)</div>
                  <div>samanthadoe@mail.com</div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between payment-row-3">
              <div className="d-flex payment-code-container align-items-center">
                <div className="payment-code-title">Payment Code:</div>
                <div className="payment-code d-flex justify-content-center align-items-center">
                  <div className="flex-fill">#FG1209878YZS</div>
                  <button className="payment-copy">Copy</button>
                </div>
              </div>
              <select
                defaultValue="title"
                className="payment-methods"
                name=""
                id=""
                title="Payment Methods"
              >
                <option value="title" disabled>
                  Select Payment Methods
                </option>
                <option value="Cash">Cash</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
            <div className="finish-payment-container">
              <button className="finish-payment-btn">
                Finish payment : <span>59:30</span>
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
export default Payment;
