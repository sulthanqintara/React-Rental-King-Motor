import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect } from "react-redux";

import backIcon from "../assets/img/icon/arrow-left.png";
import likeIcon from "../assets/img/icon/like-icon.png";
import Axios from "axios";
import { countUpAction, countDownAction } from "../redux/actionCreators/count";
import Loader from "react-loader-spinner";
const url = process.env.REACT_APP_BASE_URL;

class ViewDetail extends Component {
  state = {
    picture: "",
    amount_available: 0,
    ownerId: 0,
    id: 0,
    location: "",
    model: 0,
    price: 0,
    category: 0,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const urlVehicle = `${url}/vehicles`;
    Axios.get(urlVehicle, {
      params: { id: String(id) },
    })
      .then(({ data }) => {
        const arrayResult = data.result.data[0];
        this.setState({
          amount_available: arrayResult.amount_available,
          id: arrayResult.id,
          location: arrayResult.location,
          model: arrayResult.model,
          picture: arrayResult.picture,
          price: arrayResult.price,
          category: arrayResult.category,
          ownerId: arrayResult.owner,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const pic = this.state.picture;
    const { reduxState } = this.props;
    return (
      <>
        <Header />
        {!this.state.id && (
          <div className="loader view-detail-loader">
            <Loader type="TailSpin" color="#ffcd61" height={125} width={125} />
          </div>
        )}
        {this.state.id && (
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
                    src={url + pic.split(",")[0]}
                  />
                </div>
                <div className="d-flex align-items-center mt-5 justify-content-center slide-image">
                  <button className="remove-btn-style mx-3">
                    <img alt="" className="small-arrow " src={backIcon} />
                  </button>
                  <img
                    className="more-detail-small-pic mx-3"
                    alt=""
                    src={pic.split(",")[0] && url + pic.split(",")[0]}
                  />
                  {pic.split(",")[1] ? (
                    <img
                      className="more-detail-small-pic mx-3"
                      alt=""
                      src={url + pic.split(",")[1]}
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
                  style={
                    this.state.amount_available > 0 ? {} : { color: "red" }
                  }
                >
                  {this.state.amount_available > 0
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="detail-text">
                  Type: {this.state.category}
                  <br /> Reservation before 2 PM
                </p>
                <p className="reserve-vehicle-name d-flex justify-content-end">
                  Rp. {this.state.price}/day
                </p>
              </div>
            </section>
            {reduxState.auth.authInfo.authLevel === 3 ? (
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
            ) : (
              <section className="detail-btn-container d-lg-flex flex-lg-row justify-content-center">
                <Link to="/" className="chat-admin mt-2 px-3">
                  <button className="chat-admin">Add to Homepage</button>
                </Link>
                {console.log(
                  reduxState.auth.authInfo.user_id,
                  this.state.ownerId
                )}
                {(reduxState.auth.authInfo.user_id === this.state.ownerId ||
                  reduxState.auth.authInfo.authLevel === 1) && (
                  <Link
                    to={`/editvehicle/${this.state.id}`}
                    className="reserve-from-detail mt-2 px-3"
                  >
                    <button className="reserve-from-detail">
                      Edit Vehicle
                    </button>
                  </Link>
                )}
              </section>
            )}
          </main>
        )}
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
)(withRouter(ViewDetail));
