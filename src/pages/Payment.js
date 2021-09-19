import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import { Link, withRouter } from "react-router-dom";
import {
  getTransactionByID,
  patchTransaction,
} from "../utils/https/Transaction";
import { getVehicle } from "../utils/https/Vehicles";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Payment extends Component {
  state = {
    transactionDetail: {},
    vehicleDetail: {},
    paymentMethod: "",
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const userId = this.props.auth.authInfo.user_id;
    getTransactionByID(id)
      .then((data) => {
        this.setState({ transactionDetail: data.data.result });
        console.log(this.state.transactionDetail);
        this.setState({
          paymentMethod: this.state.transactionDetail.payment_method,
        });
        if (userId !== this.state.transactionDetail.user_id) {
          if (userId !== this.state.transactionDetail.owner_id) {
            return this.props.history.push("/");
          }
        }
        getVehicle({ id: this.state.transactionDetail.model_id }).then(
          (vehicleData) => {
            this.setState({ vehicleDetail: vehicleData.data.result[0] });
          }
        );
      })
      .catch((err) => console.log(err));
  }

  payButtonHandler = () => {
    if (!this.state.paymentMethod)
      return Swal.fire("Please Choose Payment Method!", "", "error");
    const body =
      this.props.auth.authInfo.authLevel === 3
        ? {
            id: this.state.transactionDetail.id,
            user_paid_status: 1,
            payment_method: this.state.paymentMethod,
          }
        : {
            id: this.state.transactionDetail.id,
            seller_paid_status: 1,
          };
    Swal.fire({
      icon: "success",
      title: "Payment Succeed",
      toast: true,
      timer: 2000,
      showConfirmButton: false,
    });
    setTimeout(() => {
      patchTransaction(body)
        .then((data) => {
          this.props.history.push("/");
        })
        .catch((err) => console.log(err));
    }, 2000);
  };

  render() {
    const newTimePost = new Date(this.state.transactionDetail?.time_posted);
    return (
      <>
        <Header />
        <main className="reserve-container">
          <div className="reservation-title">
            <Link to="/vehicles">
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
                  src={this.state.vehicleDetail?.picture?.split(",")[0]}
                />
              </div>
            </div>
            <div className="product-reserve payment-title-container ">
              <p className="reserve-vehicle-name">
                {this.state.vehicleDetail?.model} <br />
                <span>{this.state.vehicleDetail?.location}</span>
              </p>
              <p className="booking-code">
                {this.state.transactionDetail?.payment_code}
              </p>
              <button
                className="booking-code-btn"
                onClick={(e) => {
                  navigator.clipboard.writeText(
                    this.state.transactionDetail?.payment_code
                  );
                  Swal.fire({
                    icon: "success",
                    title: "Copied!",
                    toast: true,
                    timer: 1000,
                    showConfirmButton: false,
                  });
                }}
              >
                Copy Booking Code
              </button>
            </div>
          </section>
          <section className="payment-main pt-5">
            <div className="d-flex justify-content-between payment-row-1">
              <div className="payment-quantity">{`Quantity : ${this.state.transactionDetail.amount_rented} ${this.state.vehicleDetail.category}(s)`}</div>
              <div className="reservation-date">
                Reservation Date:
                {` ${new Date(
                  this.state.transactionDetail.rent_start_date
                ).toLocaleDateString("en-CA")} to ${new Date(
                  this.state.transactionDetail.rent_finish_date
                ).toLocaleDateString("en-CA")}`}
              </div>
            </div>
            <div className="d-flex justify-content-between payment-row-2">
              <div className="order-details-container ">
                <p className="order-details-title">Order details</p>
                <div className="order-details mb-2">
                  {`${this.state.transactionDetail.amount_rented} ${this.state.vehicleDetail.category}(s) : Rp. ${this.state.transactionDetail.prepayment}`}
                </div>
                <p className="order-details-total fw-bold">
                  Total : {`Rp. ${this.state.transactionDetail.prepayment}`}
                </p>
              </div>
              <div className="payer-identity-container">
                <p className="payer-identity-title fw-bold">Identity :</p>
                <div className="payer-identity">
                  <div>{`${this.state.transactionDetail.name} (${this.state.transactionDetail.phone_number})`}</div>
                  <div>{this.state.transactionDetail.email}</div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between payment-row-3">
              <div className="d-flex payment-code-container align-items-center">
                <div className="payment-code-title">Payment Code:</div>
                <div className="payment-code d-flex justify-content-center align-items-center">
                  <div className="flex-fill">
                    {this.state.transactionDetail.payment_code}
                  </div>
                  <button
                    className="payment-copy"
                    onClick={(e) => {
                      navigator.clipboard.writeText(
                        this.state.transactionDetail?.payment_code
                      );
                      Swal.fire({
                        icon: "success",
                        title: "Copied!",
                        toast: true,
                        timer: 1000,
                        showConfirmButton: false,
                      });
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <select
                defaultValue={
                  this.state.transactionDetail?.payment_method
                    ? this.state.transactionDetail.payment_method
                    : "title"
                }
                className="payment-methods"
                onChange={(e) => {
                  this.setState({ paymentMethod: e.target.value });
                }}
              >
                <option value="title" disabled>
                  Select Payment Methods
                </option>
                <option value="2">Cash</option>
                <option value="1">Transfer</option>
              </select>
            </div>
            <div className="finish-payment-container">
              <p className="text-center pay-before">
                Pay Before :{" "}
                {new Date(
                  newTimePost.setDate(newTimePost.getDate() + 1)
                ).toLocaleDateString("en-CA")}
                &nbsp;
                {newTimePost.toLocaleTimeString("en-US")}
              </p>
              <button
                className="finish-payment-btn"
                onClick={this.payButtonHandler}
              >
                Finish payment
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(withRouter(Payment));
