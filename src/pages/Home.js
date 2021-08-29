import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import star from "../assets/img/icon/Vectorstar.png";
import plusVector from "../assets/img/icon/vector-plus.png";
import Card from "../components/Cards";

class Home extends Component {
  state = {
    popular: [
      {
        id: 1,
        title: "Merapi",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/131137975-51a002b9-8f65-4fe4-8e2d-fb2a45fba6fb.jpg",
      },
      {
        id: 2,
        title: "Teluk Bogam",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139093-ca590c9e-3afc-49d5-bd58-7c933ad17537.jpg",
      },
      {
        id: 3,
        title: "Bromo",
        subtitle: "Malang",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139411-5481f5a4-c4a7-4b41-bc32-150c509531d0.jpg",
      },
      {
        id: 4,
        title: "Malioboro",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139519-56fdc2f3-661a-4df3-ac29-144f3e1852ca.jpg",
      },
    ],
  };
  render() {
    const data = this.state.popular;
    return (
      <div className="HomePage">
        <Header isLogin={this.props.isLogin} />
        <main>
          <section className="bg-hero">
            <div className="hero-container d-flex flex-column">
              <h2 className="title-hero">Explore and Travel</h2>
              <h3 className="subtitle-hero">Vehicle Finder</h3>
              <svg className="mb-5" width="5vh" height="2">
                <rect width="5vh" height="2" />
              </svg>
              <div className="width-dropdown">
                <select
                  defaultValue="Location"
                  className="item1 bg-white"
                  name=""
                  id=""
                >
                  <option value="Location" disabled>
                    Location
                  </option>
                  <option value="Yogyakarta">Yogyakarta</option>
                  <option value="Kalimantan">Kalimantan</option>
                  <option value="Malang">Malang</option>
                  <option value="South Jakarta">South Jakarta</option>
                </select>
                <select
                  defaultValue="Type"
                  className="item2 bg-white"
                  name=""
                  id=""
                >
                  <option value="Type" disabled>
                    Type
                  </option>
                  <option value="Car">Car</option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Bicycle">Bicycle</option>
                </select>
                <select
                  defaultValue="Payment"
                  className="item3 bg-white"
                  name=""
                  id=""
                >
                  <option value="Payment" disabled>
                    Payment
                  </option>
                  <option value="Paid">Paid</option>
                  <option value="Payment Pending">Payment Pending</option>
                </select>
                <input
                  className="item4"
                  type="date"
                  id="DD/MM/YY"
                  name="DD/MM/YY"
                  placeholder=""
                />
              </div>
              <Link className="btn-explore-container" to="/">
                <button title="explore" className="btn-explore">
                  Explore
                </button>
              </Link>
            </div>
          </section>
          <section className="main-article">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Popular in Town</div>
              <Link to={"/vehicle-type"} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {data.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture}
                    title={data.title}
                    subtitle={data.subtitle}
                  />
                );
              })}
            </div>
            <section className="testimonials">
              <div className="testimonials-title">Testimonials</div>
              <div className="container-testimonials">
                <div className="d-flex flex-column review">
                  <div className="star">
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                  </div>
                  <p className="review-text font-mulish">
                    ”It was the right decision to rent vehicle here, I spent
                    less money and enjoy the trip. It was an amazing experience
                    to have a ride for wildlife trip!”
                  </p>
                  <p className="founder-circle">
                    Edward Newgate
                    <span>
                      <br />
                      Founder Circle
                    </span>
                  </p>
                </div>
                <div className="d-flex justify-content-center review-photo-container">
                  <div className="review-photo">
                    <div className="d-flex big-green-circle justify-content-center align-items-center">
                      <div className="big-white-circle"></div>
                    </div>
                    <img src={plusVector} className="plus-vector" alt="" />
                    <div className="white-box">
                      <button
                        title="left-button-profile"
                        className="left-button"
                      >
                        <Link to="#">
                          <svg height="40" width="40">
                            <circle
                              cx="20"
                              cy="20"
                              r="17"
                              stroke="#D7D7D7"
                              strokeWidth="3"
                              fill="white"
                            />
                          </svg>
                        </Link>
                        <div className="left-arrow"></div>
                      </button>
                      <button
                        title="right-button-profile"
                        className="right-button"
                      >
                        <Link to="#">
                          <svg height="40" width="40">
                            <circle
                              cx="20"
                              cy="20"
                              r="17"
                              stroke="black"
                              strokeWidth="3"
                              fill="white"
                            />
                          </svg>
                        </Link>
                        <div className="right-arrow"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
