import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import arrow from "../assets/img/icon/arrow-left.png";

export default class History extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="d-flex p-5">
          <div className="search container d-flex">
            <div className="history-container">
              <div className="d-flex search-field">
                <form className="search-form ">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search History"
                    autoComplete="off"
                  />
                  <div className="filter">
                    <select
                      defaultValue="default"
                      className="form-select"
                      aria-label=" select example"
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
                </form>
                <div>
                  <label htmlFor="selectAll"> I have a bike</label>
                  <input type="checkbox" id="selectAll" value="Select All" />
                </div>
              </div>
              <div className="history-today-container">
                <div className="time-stamp">Today</div>
                <div className="d-flex hitory-item">
                  <div>
                    Please finish your payment for vespa for Vespa Rental Jogja
                  </div>
                  <img alt="" className="flip-image" src={arrow}></img>
                  <input type="checkbox" id="history1" value="history1" />
                </div>
                <div className="d-flex hitory-item">
                  <div>Your payment has been confirmed!</div>
                  <img alt="" className="flip-image" src={arrow}></img>
                  <input type="checkbox" id="history2" value="history2" />
                </div>
              </div>
              <div className="history-1week-container">
                <div className="time-stamp">A week ago</div>
                <div className="d-flex hitory-item">
                  <img
                    alt=""
                    src={
                      "https://user-images.githubusercontent.com/38064315/130650803-5a568c0c-c991-4492-a95c-ccec2a70cc47.jpg"
                    }
                    className="history-item-pic"
                  />
                  <div className="d-flex flex-column">
                    <div className="history-item-title">Vespa Matic</div>
                    <p>Jan 18 to 21 2021</p>
                    <div className="prepayment-price">
                      Prepayment : Rp 245.000
                    </div>
                    <div className="history-status">Has been returned</div>
                  </div>
                </div>
                <div className="d-flex hitory-item">
                  <img
                    alt=""
                    src={
                      "https://user-images.githubusercontent.com/38064315/130650803-5a568c0c-c991-4492-a95c-ccec2a70cc47.jpg"
                    }
                    className="history-item-pic"
                  />
                  <div className="d-flex flex-column">
                    <div className="history-item-title">Vespa Matic</div>
                    <p>Jan 18 to 21 2021</p>
                    <div className="prepayment-price">
                      Prepayment : Rp 245.000
                    </div>
                    <div className="history-status">Has been returned</div>
                  </div>
                </div>
                <div className="d-flex hitory-item"></div>
              </div>
            </div>
            <div className="new-arrival"></div>
          </div>

          <div className="new-arrival"></div>
        </main>
        <Footer />
      </div>
    );
  }
}
