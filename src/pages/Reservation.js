import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import backIcon from "../assets/img/icon/arrow-left.png";

class Reservation extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="reserve-container">
          <div className="reservation-title">
            <Link to="/">
              <img src={backIcon} alt="" />
            </Link>
            <span>Reservation</span>
          </div>
          <section
            className="
          d-flex
          flex-column
          justify-content-center
          flex-xl-row
          reserve-detail
        "
          >
            <div className="reserve-pic-container">
              <div className="reserve-pic"></div>
            </div>
            <div className="flex-grow-1 product-reserve">
              <p className="reserve-vehicle-name">
                Fixie - Gray Only <br />
                <span>Yogyakarta</span>
              </p>
              <p className="no-prepayment">No Prepayment</p>
              <div className="d-flex justify-content-between flex-row reserve-amount">
                <button className="rmv-btn" onClick={this.props.rmvReserve}>
                  -
                </button>
                <div className="amount-added">{this.props.reservedState}</div>
                <button className="add-btn" onClick={this.props.addReserve}>
                  +
                </button>
              </div>
              <p className="reserve-date-title">Reservation Date :</p>
              <div>
                <input
                  className="reserve-date"
                  type="date"
                  id="DD/MM/YY"
                  name="DD/MM/YY"
                  defaultValue=""
                />
              </div>
              <select className="duration" name="" id="">
                <option defaultValue="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>
          </section>
          <Link to="/payment">
            <button className="btn-pay">
              Pay now : Rp. {this.props.reservedState * 64000}
            </button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }
}

export default Reservation;
