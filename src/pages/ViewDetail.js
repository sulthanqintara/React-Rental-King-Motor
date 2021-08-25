import { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import likeIcon from "../assets/img/icon/like-icon.png";
class ViewDetail extends Component {
  render() {
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
                  src={
                    "https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg"
                  }
                />
              </div>
              <div className="d-flex align-items-center mt-5 justify-content-center slide-image">
                <button className="remove-btn-style mx-3">
                  <img alt="" className="small-arrow " src={backIcon} />
                </button>
                <img
                  className="more-detail-small-pic mx-3"
                  alt=""
                  src={
                    "https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg"
                  }
                />
                <img
                  className="more-detail-small-pic mx-3"
                  alt=""
                  src={
                    "https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg"
                  }
                />
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
                Rp. {this.props.reservedState * 64000}/day
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
