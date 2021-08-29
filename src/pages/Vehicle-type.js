import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";
import Axios from "axios";

class vehicleType extends Component {
  state = {
    data: [],
    search: [],
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
    cars: [
      {
        id: 1,
        title: "Merapi",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/131137975-51a002b9-8f65-4fe4-8e2d-fb2a45fba6fb.jpg",
      },
      {
        id: 5,
        title: "Lambhorgini",
        subtitle: "South Jakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130649294-e7a3bf3c-2cd1-4091-88fd-3d73fe4e8c97.jpg",
      },
      {
        id: 3,
        title: "Jeep",
        subtitle: "Malang",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139411-5481f5a4-c4a7-4b41-bc32-150c509531d0.jpg",
      },
      {
        id: 6,
        title: "White Jeep",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/130650291-09e9a5a4-c62c-4edf-8fc3-c8d234dca9fc.jpg",
      },
    ],
    motorcycle: [
      {
        id: 7,
        title: "Vespa",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130650803-5a568c0c-c991-4492-a95c-ccec2a70cc47.jpg",
      },
      {
        id: 2,
        title: "Honda KLX",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139093-ca590c9e-3afc-49d5-bd58-7c933ad17537.jpg",
      },
      {
        id: 8,
        title: "Honda",
        subtitle: "Malang",
        picture:
          "https://user-images.githubusercontent.com/38064315/130651301-89e91b51-92c2-44be-af18-87015266e220.jpg",
      },
      {
        id: 4,
        title: "Matic Bike",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/131139519-56fdc2f3-661a-4df3-ac29-144f3e1852ca.jpg",
      },
    ],
    bike: [
      {
        id: 9,
        title: "Fixie",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130651829-6619742b-4f34-4ee2-ae9c-9fb511863936.jpg",
      },
      {
        id: 10,
        title: "Sport Bike",
        subtitle: "Kalimantan",
        picture:
          "https://user-images.githubusercontent.com/38064315/130652289-e2df5063-42db-42d6-9c1c-db5a08d1c950.jpg",
      },
      {
        id: 11,
        title: "Onthel",
        subtitle: "Malang",
        picture:
          "https://user-images.githubusercontent.com/38064315/130652795-01e66a12-a4d5-4a70-8eef-f33315c549fe.jpg",
      },
      {
        id: 12,
        title: "Fixie Gray",
        subtitle: "Yogyakarta",
        picture:
          "https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg",
      },
    ],
    vehicleSearch: "",
    searchError: "",
  };

  searchVehicleHandler = (e) => {
    const url = "http://localhost:8000/vehicles";
    e.preventDefault();
    Axios.get(url, {
      params: this.state.vehicleSearch
        ? { keyword: this.state.vehicleSearch }
        : { searchError: "" },
    })
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
    getPerType(1);
    getPerType(2);
    getPerType(3);
  }

  render() {
    return (
      <>
        <Header />
        <main className="vehicle-types-container">
          <form
            autoComplete="off"
            className="vehicle-form"
            onSubmit={this.searchVehicleHandler}
          >
            <input
              type="text"
              id="vehicleName"
              name="vehicleName"
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
                    title={data.title}
                    subtitle={data.subtitle}
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

export default vehicleType;
