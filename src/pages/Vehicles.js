import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";

class Vehicles extends Component {
  state = {
    data: [],
    search: [],
    popular: [],
    cars: [],
    motorcycle: [],
    bike: [],
  };
  axiosGet = (query) => {
    Axios.get(`http://localhost:8000/vehicles${query}`)
      .then(({ data }) => {
        console.log(data.result);
        this.setState({
          search: data.result,
        });
      })
      .catch((err) => {
        this.setState({
          searchError: err.response.status,
          search: [],
        });
      });
  };
  searchVehicleHandler = (e) => {
    e.preventDefault();
    console.log();
    const query = `?keyword=${this.state.vehicleSearch}`;
    this.props.history.push("/vehicles?keyword=" + this.state.vehicleSearch);
    this.axiosGet(query);
  };
  componentDidMount() {
    const url = "http://localhost:8000/vehicles";
    const getPerType = (filter) => {
      Axios.get(url, {
        params: { filter_by_type: filter },
      })
        .then(({ data }) => {
          if (filter === 1) {
            this.setState({
              cars: data.result,
            });
          }
          if (filter === 2) {
            this.setState({
              motorcycle: data.result,
            });
          }
          if (filter === 3) {
            this.setState({
              bike: data.result,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    Axios.get(url, {
      params: { order_by: "v.popular_stats", sort: "DESC" },
    })
      .then(({ data }) => {
        this.setState({ popular: data.result });
      })
      .catch((err) => {
        console.log(err);
      });
    getPerType(1);
    getPerType(2);
    getPerType(3);
    const querySearch = this.props.location.search;
    querySearch && this.axiosGet(querySearch);
  }
  render() {
    return (
      <>
        <Header />
        <main className="vehicles-container">
          <form
            autoComplete="off"
            className="vehicle-form"
            onSubmit={this.searchVehicleHandler}
          >
            <input
              type="text"
              className="search-form"
              placeholder="Search vehicle (ex. cars, cars name)"
              onChange={(e) => this.setState({ vehicleSearch: e.target.value })}
            />
            {this.state.search.length > 0 ? (
              <>
                <h2 className="mt-5">Search Result:</h2>
                <div className="row justify-content-around align-items-center mb-5">
                  {this.state.search.map((data) => {
                    return (
                      <Card
                        key={data.id}
                        link={`/detail/${data.id}`}
                        picture={data.picture.split(",")[0]}
                        title={data.model}
                        subtitle={data.location}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <h2 className="mt-5">
                {this.state.searchError === 404 ? "Product Not Found" : ""}
              </h2>
            )}
          </form>
          <section className="vehicle-list">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Popular in Town</div>
              <Link to={`#`} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.popular.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture.split(",")[0]}
                    title={data.model}
                    subtitle={data.location}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Cars</div>
              <Link to={`#`} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {this.getVehicleHandler}
              {this.state.cars.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture.split(",")[0]}
                    title={data.model}
                    subtitle={data.location}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Motorcycle</div>
              <Link to={`#`} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.motorcycle.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture.split(",")[0]}
                    title={data.model}
                    subtitle={data.location}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Bike</div>
              <Link to={`#`} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.bike.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={data.picture.split(",")[0]}
                    title={data.model}
                    subtitle={data.location}
                  />
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Vehicles;
