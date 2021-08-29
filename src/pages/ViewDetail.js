import { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import likeIcon from "../assets/img/icon/like-icon.png";
import Axios from "axios";

class ViewDetail extends Component {
  state = {
    amount_available: 0,
    category: "",
    id: 0,
    location: "",
    model: "",
    picture: "",
    price: 0,
  };
  componentDidMount() {
    const idParams = this.props.match.params.id;
    const url = "http://localhost:8000/vehicles";
    Axios.get(url, {
      params: { id: String(idParams) },
    })
      .then(({ data }) => {
        console.log(data.result);
        this.setState({
          amount_available: data.result[0].amount_available,
          category: data.result[0].category,
          id: data.result[0].id,
          location: data.result[0].location,
          model: data.result[0].model,
          picture: data.result[0].picture,
          price: data.result[0].price,
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
            <Link to="/">
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
                Fixie - Gray Only <br />
                <span>Yogyakarta</span>
              </p>
              <p className="available-color">Available</p>
              <p className="no-prepayment">No Prepayment</p>
              <p className="detail-text">
                Capacity: 1 person
                <br />
                Type: Bike
                <br /> Reservation before 2 PM
              </p>
              <p className="reserve-vehicle-name d-flex justify-content-end">
                Rp. {this.props.reservedState * this.state.price}/day
              </p>
              <div className="d-flex justify-content-between flex-row reserve-amount">
                <button className="rmv-btn" onClick={this.props.rmvReserve}>
                  -
                </button>
                <div className="amount-added">{this.props.reservedState}</div>
                <button className="add-btn" onClick={this.props.addReserve}>
                  +
                </button>
              </div>
            </div>
          </section>
          <section className="detail-btn-container d-lg-flex flex-lg-row justify-content-center">
            <Link to="/chat" className="chat-admin mt-2 px-3">
              <button className="chat-admin">Chat Admin</button>
            </Link>
            <Link to="/reservation" className="reserve-from-detail mt-2 px-3">
              <button className="reserve-from-detail">Reservation</button>
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
