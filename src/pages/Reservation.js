import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import backIcon from "../assets/img/icon/arrow-left.png";
import Axios from "axios";
import CounterButton from "../components/CounterButton";

class Reservation extends Component {
  state = {
    picture: "",
    reserved: 1,
  };

  addReserve = () => {
    if (this.state.reserved <= this.state.amount_available)
      this.setState((prevState) => {
        return {
          reserved: prevState.reserved + 1,
        };
      });
  };

  removeReserve = () => {
    this.setState((prevState) => {
      if (this.state.reserved > 1) {
        return {
          reserved: prevState.reserved - 1,
        };
      }
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const url = "http://localhost:8000/vehicles";
    Axios.get(url, {
      params: { id: String(id) },
    })
      .then(({ data }) => {
        const arrayResult = data.result[0];
        this.setState({
          amount_available: arrayResult.amount_available,
          category: arrayResult.category,
          id: arrayResult.id,
          location: arrayResult.location,
          model: arrayResult.model,
          picture: arrayResult.picture,
          price: arrayResult.price,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const pic = this.state.picture;
    return (
      <>
        <Header />
        <main className="reserve-container">
          <div className="reservation-title">
            <Link to="/vehicles">
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
            <div className="d-flex justify-content-center">
              <img
                className="more-detail-big-pic"
                alt=""
                src={pic.split(",")[0]}
              />
            </div>
            <div className="flex-grow-1 product-reserve">
              <p className="reserve-vehicle-name">
                {this.state.model} <br />
                <span>{this.state.location}</span>
              </p>
              <p className="no-prepayment">No Prepayment</p>
              {this.state.amount_available > 0 ? (
                <CounterButton
                  onClickRemove={this.removeReserve}
                  onClickAdd={this.addReserve}
                  value={this.state.reserved}
                />
              ) : (
                <CounterButton value={"0"} disabled />
              )}
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
              Pay now : Rp. {this.state.reserved * this.state.price}
            </button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }
}

export default Reservation;
