import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import arrow from "../assets/img/icon/arrow-left.png";
import HistoryComponent from "../components/HistoryComponent";
import Card from "../components/Cards";
import { Link } from "react-router-dom";

export default class History extends Component {
  state = {
    history: [
      {
        id: 1,
        imageUrl:
          "https://user-images.githubusercontent.com/38064315/130650803-5a568c0c-c991-4492-a95c-ccec2a70cc47.jpg",
        vehicleName: "Vespa Matic",
        rentStart: "2021-01-18",
        rentFinish: "2021-01-21",
        price: 245000,
        rentStatus: true,
      },
      {
        id: 2,
        imageUrl:
          "https://user-images.githubusercontent.com/38064315/130651301-89e91b51-92c2-44be-af18-87015266e220.jpg",
        vehicleName: "Honda",
        rentStart: "2021-01-18",
        rentFinish: "2021-01-21",
        price: 245000,
        rentStatus: true,
      },
    ],
    newArrival: [
      {
        id: 5,
        title: "Lambhorgini",
        subtitle: "South Jakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130649294-e7a3bf3c-2cd1-4091-88fd-3d73fe4e8c97.jpg",
      },
      {
        id: 6,
        title: "White Jeep",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/130650291-09e9a5a4-c62c-4edf-8fc3-c8d234dca9fc.jpg",
      },
    ],
  };
  render() {
    return (
      <div>
        <Header />
        <main className="d-flex history-main">
          <div className="d-flex flex-column flex-fill">
            <div className="d-flex search-container">
              <form className="flex-grow-7">
                <input
                  type="text"
                  id="search"
                  placeholder="Search History"
                  autoComplete="off"
                  className="search-form-history"
                />
              </form>
              <div className="d-flex align-items-center flex-column history-checkbox">
                <label htmlFor="selectAll">Select</label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="selectAll"
                />
              </div>
            </div>
            <div className="filter">
              <select
                defaultValue="default"
                className="form-select"
                aria-label="select"
              >
                <option value="default" hidden disabled>
                  Filter
                </option>
                <option value="type">Type</option>
                <option value="date">Date Added</option>
                <option value="name">Name</option>
                <option value="favourite">Favourite Product</option>
              </select>
            </div>
            <div className="history-container">
              <div className="time-stamp">Today</div>
              <div className="d-flex history-item align-items-center">
                <Link to="#" className="d-flex flex-grow-7 align-items-center">
                  <div>
                    Please finish your payment for vespa for Vespa Rental Jogja
                  </div>
                  <img alt="" className="flip-image" src={arrow}></img>
                </Link>
                <div className="d-flex justify-content-center history-checkbox">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAll"
                  />
                </div>
              </div>
              <div className="d-flex history-item align-items-center">
                <Link to="#" className="d-flex flex-grow-7 align-items-center">
                  <div>Your payment has been confirmed!</div>
                  <img alt="" className="flip-image" src={arrow}></img>
                </Link>
                <div className="d-flex justify-content-center history-checkbox">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="selectAll"
                  />
                </div>
              </div>
              <div className="time-stamp">A week ago</div>
              {this.state.history.map((data) => {
                return (
                  <HistoryComponent
                    key={data.id}
                    id={data.id}
                    imageUrl={data.imageUrl}
                    vehicleName={data.vehicleName}
                    rentStart={data.rentStart}
                    rentFinish={data.rentFinish}
                    price={data.price}
                    status={data.rentStatus}
                  />
                );
              })}
              <button className="delete-btn">Delete selected item</button>
            </div>
          </div>
          <div className="new-arrival">
            <div className="text-center new-arrival-title">New Arrival</div>
            <div className="d-flex flex-column new-arrival-items">
              {this.state.newArrival.map((data) => {
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
            <div className="text-center mt-3">View more</div>
            <div className="d-flex justify-content-center">
              <Link to="/vehicles" className="view-more-new-arrival">
                <img alt="" className="view-more-new-arrival" src={arrow} />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
