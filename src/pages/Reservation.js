import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { postTransactions } from "../utils/https/Transaction";
import Axios from "axios";

import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import backIcon from "../assets/img/icon/arrow-left.png";
import CounterButton from "../components/CounterButton";
import { countDownAction, countUpAction } from "../redux/actionCreators/count";

class Reservation extends Component {
  state = {
    picture: "",
    reserved: 1,
    duration: 1,
    reserveStartDate: "",
  };

  onMinusHandler = () => {
    this.props.dispatch(countDownAction());
  };
  onPlusHandler = () => {
    this.props.dispatch(countUpAction());
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

  postPayHandler = () => {
    if (!this.state.reserveStartDate)
      return Swal.fire("Please Choose Rent Date!", "", "error");
    const reduxState = this.props.reduxState;
    const { id } = this.props.match.params;
    const pickedDate = new Date(`${this.state.reserveStartDate}`);
    const finishedDate = new Date(
      pickedDate.setDate(pickedDate.getDate() + Number(this.state.duration))
    ).toLocaleDateString("en-CA");
    const booking_code = String(
      `#${id}${reduxState.auth.authInfo.user_id}${
        this.state.location.split("")[0]
      }${new Date().getMilliseconds()}${
        this.state.model.split("")[0]
      }${this.state.category.split("", [0])}`
    );
    const min = Math.ceil(11111111);
    const max = Math.floor(99999999);
    const payment_code = Math.floor(Math.random() * (max - min) + min);

    const body = {
      user_id: reduxState.auth.authInfo.user_id,
      model_id: id,
      amount_rented: reduxState.count.number,
      prepayment: reduxState.count.number * this.state.price,
      rent_start_date: String(this.state.reserveStartDate),
      rent_finish_date: String(finishedDate),
      payment_method: 1,
      booking_code,
      payment_code: payment_code,
    };

    postTransactions(body)
      .then((data) => {
        this.props.history.push(`/payment/${data.data.result}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const url = process.env.REACT_APP_BASE_URL;
    Axios.get(`${url}/vehicles`, {
      params: { id: String(id) },
    })
      .then(({ data }) => {
        const arrayResult = data.result.data[0];
        this.setState({
          amount_available: arrayResult.amount_available,
          category: arrayResult.category,
          id: arrayResult.id,
          location: arrayResult.location,
          model: arrayResult.model,
          picture: url + arrayResult.picture.split(",")[0],
          price: arrayResult.price,
        });
        localStorage.setItem("vehicleData", JSON.stringify(arrayResult));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const pic = this.state.picture;
    const { reduxState, countUp, countDown } = this.props;
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
              <div className="my-5">
                {this.state.amount_available > 0 ? (
                  <CounterButton
                    onClickRemove={countDown}
                    onClickAdd={countUp}
                    value={reduxState.count.number}
                  />
                ) : (
                  <CounterButton value={"0"} disabled />
                )}
              </div>
              <p className="reserve-date-title">Reservation Date :</p>
              <div>
                <input
                  className="reserve-date"
                  type="date"
                  onChange={(e) => {
                    this.setState({ reserveStartDate: e.target.value });
                  }}
                />
              </div>
              <select
                className="duration"
                onChange={(e) => {
                  this.setState({ duration: e.target.value });
                }}
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
              </select>
            </div>
          </section>
          <button className="btn-pay" onClick={this.postPayHandler}>
            Pay now : Rp. {reduxState.count.number * this.state.price}
          </button>
        </main>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (reduxState) => {
  return {
    reduxState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    countUp: () => {
      dispatch(countUpAction());
    },
    countDown: () => {
      dispatch(countDownAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Reservation));
