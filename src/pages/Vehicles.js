import { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";
import Loader from "react-loader-spinner";
const url = process.env.REACT_APP_BASE_URL;

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: [],
      popular: [],
      cars: [],
      motorcycle: [],
      bike: [],
    };
  }
  axiosGet = (query) => {
    Axios.get(`${url}/vehicles${query}`)
      .then(({ data }) => {
        this.setState({
          search: data.result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  searchVehicleHandler = (e) => {
    e.preventDefault();
    const query = `?keyword=${this.state.vehicleSearch}`;
    this.props.history.push("/vehicles?keyword=" + this.state.vehicleSearch);
    this.axiosGet(query);
  };
  componentDidMount() {
    const getPerType = (filter) => {
      Axios.get(`${url}/vehicles`, {
        params: { filter_by_type: filter, limit: 4 },
      })
        .then(({ data }) => {
          if (filter === 1) {
            this.setState({
              cars: data.result.data,
            });
          }
          if (filter === 2) {
            this.setState({
              motorcycle: data.result.data,
            });
          }
          if (filter === 3) {
            this.setState({
              bike: data.result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    Axios.get(`${url}/vehicles`, {
      params: { order_by: "v.popular_stats", sort: "DESC", limit: "4" },
    })
      .then(({ data }) => {
        this.setState({ popular: data.result.data });
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
                  {this.state.search?.map((data) => {
                    return (
                      <Card
                        key={data.id}
                        link={`/detail/${data.id}`}
                        picture={url + data.picture.split(",")[0]}
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
            {!this.state.popular[0] && (
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.popular?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
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
            {!this.state.cars[0] && (
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.getVehicleHandler}
              {this.state.cars?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
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
            {!this.state.motorcycle[0] && (
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.motorcycle?.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
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
            {!this.state.bike[0] && (
              <div className="loader">
                <Loader
                  type="TailSpin"
                  color="#ffcd61"
                  height={80}
                  width={80}
                />
              </div>
            )}
            <div className="row justify-content-around align-items-center mb-5">
              {this.state.bike.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    picture={url + data.picture.split(",")[0]}
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

export default withRouter(Vehicles);
