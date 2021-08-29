import { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import likeIcon from "../assets/img/icon/like-icon.png";
import Axios from "axios";
import CounterButton from "../components/CounterButton";

class ViewDetail extends Component {
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
            <span>Detail</span>
          </div>
          <section
            className="d-flex flex-column
          justify-content-center
          flex-xl-row mt-5
          "
          >
            <div className="detail-pic-container ">
              <div className="d-flex justify-content-center">
                <img
                  className="more-detail-big-pic"
                  alt=""
                  src={pic.split(",")[0]}
                />
              </div>
              <div className="d-flex align-items-center mt-5 justify-content-center slide-image">
                <button className="remove-btn-style mx-3">
                  <img alt="" className="small-arrow " src={backIcon} />
                </button>
                <img
                  className="more-detail-small-pic mx-3"
                  alt=""
                  src={pic.split(",")[0]}
                />
                {pic.split(",")[1] ? (
                  <img
                    className="more-detail-small-pic mx-3"
                    alt=""
                    src={pic.split(",")[1]}
                  />
                ) : (
                  ""
                )}
                <button className="remove-btn-style mx-3">
                  <img
                    alt=""
                    className="small-arrow flip-image"
                    src={backIcon}
                  />
                </button>
              </div>
            </div>
            <div className="product-reserve more-detail-container ">
              <p className="reserve-vehicle-name">
                {this.state.model} <br />
                <span>{this.state.location}</span>
              </p>
              <p
                className="available-color"
                style={this.state.amount_available > 0 ? {} : { color: "red" }}
              >
                {this.state.amount_available > 0
                  ? "Available"
                  : "Not Available"}
              </p>
              <p className="detail-text">
                Capacity: 1 person
                <br />
                Type: Bike
                <br /> Reservation before 2 PM
              </p>
              <p className="reserve-vehicle-name d-flex justify-content-end">
                Rp. {this.state.reserved * this.state.price}/day
              </p>
              {this.state.amount_available > 0 ? (
                <CounterButton
                  onClickRemove={this.removeReserve}
                  onClickAdd={this.addReserve}
                  value={this.state.reserved}
                />
              ) : (
                <CounterButton value={"0"} disabled />
              )}
            </div>
          </section>
          <section className="detail-btn-container d-lg-flex flex-lg-row justify-content-center">
            <Link to="/chat" className="chat-admin mt-2 px-3">
              <button className="chat-admin">Chat Admin</button>
            </Link>
            <Link
              to={`/reservation/${this.props.match.params.id}`}
              className="reserve-from-detail mt-2 px-3"
            >
              {this.state.amount_available > 0 ? (
                <button className="reserve-from-detail">Reservation</button>
              ) : (
                <button disabled className="reserve-from-detail">
                  Reservation
                </button>
              )}
            </Link>
            <Link to="/reservation" className="like-btn mt-2 px-3">
              <button className="like-btn">
                <img alt="" src={likeIcon}></img>Like
              </button>
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default ViewDetail;
