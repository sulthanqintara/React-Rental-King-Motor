import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default class History extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="d-flex p-5">
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
              </form>
            </div>
            <div className="filter">
              <select className="form-select" aria-label=" select example">
                <option selected disabled>
                  Filter
                </option>
                <option value="type">Type</option>
                <hr />
                <option value="date">Date Added</option>
                <hr />
                <option value="name">Name</option>
                <hr />
                <option value="favourite">Favourite Product</option>
                <hr />
              </select>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> I have a bike</label>
              <br></br>
            </div>
          </div>
          <div className="new-arrival"></div>
        </main>
        <Footer />
      </div>
    );
  }
}
