import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { getTransaction, deleteTransaction } from "../utils/https/Transaction";

import Header from "../components/Header";
import Footer from "../components/Footer";
import arrow from "../assets/img/icon/arrow-left.png";
import Card from "../components/Cards";
import HistoryComponent from "../components/HistoryComponent";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class History extends Component {
  state = {
    history: [],
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
    search: "",
    dateFilter: "",
    selectedHistory: "",
  };
  authInfo = this.props.auth.authInfo;
  authLevel = Number(this.authInfo.authLevel);

  searchHandler = (e) => {
    e.preventDefault();
    let dateParams = "";
    const currentDate = new Date();
    switch (Number(this.state.dateFilter)) {
      case 1:
        dateParams = new Date(
          currentDate.setDate(currentDate.getDate() - 1)
        ).toLocaleDateString("en-CA");
        break;
      case 2:
        dateParams = new Date(
          currentDate.setDate(currentDate.getDate() - 7)
        ).toLocaleDateString("en-CA");
        break;
      case 3:
        dateParams = "0000-00-00";
        break;
      default:
        dateParams = "";
    }
    const params =
      this.authLevel === 3
        ? {
            user_id: this.authInfo.user_id,
            keyword: this.state.search,
            filter_date: dateParams,
            sort: "DESC",
          }
        : {
            owner_id: this.authInfo.user_id,
            keyword: this.state.search,
            filter_date: dateParams,
            sort: "DESC",
          };
    getTransaction(params).then((data) => {
      this.setState({ history: data.data.result.data });
    });
  };

  deleteHandler = (e) => {
    e.preventDefault();
    if (!this.state.selectedHistory)
      return Swal.fire("Please Choose History!", "", "error");
    const form = new URLSearchParams();
    form.append("id", Number(this.state.selectedHistory));
    Swal.fire({
      title: "Are you sure you want to delete that history?",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      denyButtonText: `Don't delete!`,
      confirmButtonColor: "#bb2d3b",
      cancelButtonColor: "#198754",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(form)
          .then((date) => Swal.fire("Item Deleted!", "", "success"))
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  componentDidMount() {
    const params =
      this.authLevel === 3
        ? { user_id: this.authInfo.user_id }
        : { owner_id: this.authInfo.user_id };
    getTransaction(params).then((data) => {
      return this.setState({ history: data.data.result.data });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <main className="d-flex history-main">
          <div className="d-flex flex-column flex-fill">
            <div className="d-flex search-container">
              <form className="flex-grow-7" onSubmit={this.searchHandler}>
                <input
                  type="text"
                  placeholder="Search History"
                  autoComplete="off"
                  className="search-form-history"
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                />
              </form>
              <div className="d-flex align-items-center flex-column history-checkbox">
                Select
              </div>
            </div>
            <div className="filter d-flex ">
              <select
                defaultValue="0"
                className="form-select"
                aria-label="select"
                onChange={(e) => {
                  this.setState({ dateFilter: e.target.value });
                }}
              >
                <option value="0" hidden disabled>
                  Date Added
                </option>
                <option value="1">Today</option>
                <option value="2">A week ago</option>
                <option value="3">More than a week ago</option>
              </select>
            </div>
            <form
              className="history-container"
              onChange={(e) => {
                this.setState({ selectedHistory: e.target.value });
              }}
            >
              <div className="time-stamp">Today</div>
              {this.state.history.map((data) => {
                const currentDate = new Date();
                if (
                  new Date(data.rent_start_date) >=
                  new Date(currentDate.setDate(currentDate.getDate() - 1))
                )
                  return (
                    <HistoryComponent
                      key={data.id}
                      id={data.id}
                      vehicleId={data.model_id}
                      vehicleName={data.model}
                      rentStart={new Date(
                        data.rent_start_date
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.rent_finish_date
                      ).toLocaleDateString("en-CA")}
                      price={data.prepayment}
                      returned={data.returned_status}
                      userPaid={data.user_paid_status}
                      sellerPaid={data.seller_paid_status}
                      authLevel={this.authLevel}
                    />
                  );
                return "";
              })}
              <div className="time-stamp">A week ago</div>
              {this.state.history.map((data) => {
                const currentDate = new Date();
                if (
                  new Date(data.rent_start_date) <=
                    new Date(currentDate.setDate(currentDate.getDate() - 1)) &&
                  new Date(data.rent_start_date) >=
                    new Date(currentDate.setDate(currentDate.getDate() - 7))
                )
                  return (
                    <HistoryComponent
                      key={data.id}
                      id={data.id}
                      vehicleId={data.model_id}
                      vehicleName={data.model}
                      rentStart={new Date(
                        data.rent_start_date
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.rent_finish_date
                      ).toLocaleDateString("en-CA")}
                      price={data.prepayment}
                      returned={data.returned_status}
                      userPaid={data.user_paid_status}
                      sellerPaid={data.seller_paid_status}
                      authLevel={this.authLevel}
                    />
                  );
                return "";
              })}
              <div className="time-stamp">More than a week ago</div>
              {this.state.history.map((data) => {
                const currentDate = new Date();
                if (
                  new Date(data.rent_start_date) <=
                  new Date(currentDate.setDate(currentDate.getDate() - 7))
                )
                  return (
                    <HistoryComponent
                      key={data.id}
                      id={data.id}
                      vehicleId={data.model_id}
                      vehicleName={data.model}
                      rentStart={new Date(
                        data.rent_start_date
                      ).toLocaleDateString("en-CA")}
                      rentFinish={new Date(
                        data.rent_finish_date
                      ).toLocaleDateString("en-CA")}
                      price={data.prepayment}
                      returned={data.returned_status}
                      userPaid={data.user_paid_status}
                      sellerPaid={data.seller_paid_status}
                      authLevel={this.authLevel}
                    />
                  );
                return "";
              })}
              <button className="delete-btn" onClick={this.deleteHandler}>
                Delete selected item
              </button>
            </form>
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

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(withRouter(History));
