import { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Cards";

class vehicleType extends Component {
  state = {
    data: [],
  };
  popular = [
    {
      id: 1,
      title: "Merapi",
      subtitle: "Yogyakarta",
      picture: "popular-1",
    },
    {
      id: 2,
      title: "Teluk Bogam",
      subtitle: "Kalimantan",
      picture: "popular-2",
    },
    {
      id: 3,
      title: "Bromo",
      subtitle: "Malang",
      picture: "popular-3",
    },
    {
      id: 4,
      title: "Malioboro",
      subtitle: "Yogyakarta",
      picture: "popular-4",
    },
  ];
  cars = [
    {
      id: 1,
      title: "Merapi",
      subtitle: "Yogyakarta",
      picture: "popular-1",
    },
    {
      id: 5,
      title: "Lambhorgini",
      subtitle: "South Jakarta",
      picture: "car-2",
    },
    {
      id: 3,
      title: "Jeep",
      subtitle: "Malang",
      picture: "popular-3",
    },
    {
      id: 6,
      title: "White Jeep",
      subtitle: "Kalimantan",
      picture: "car-4",
    },
  ];
  motorcycle = [
    {
      id: 7,
      title: "Vespa",
      subtitle: "Yogyakarta",
      picture: "motor-1",
    },
    {
      id: 2,
      title: "Honda KLX",
      subtitle: "Kalimantan",
      picture: "popular-2",
    },
    {
      id: 8,
      title: "Honda",
      subtitle: "Malang",
      picture: "motor-3",
    },
    {
      id: 4,
      title: "Matic Bike",
      subtitle: "Yogyakarta",
      picture: "popular-4",
    },
  ];
  bike = [
    {
      id: 9,
      title: "Fixie",
      subtitle: "Yogyakarta",
      picture: "bike-1",
    },
    {
      id: 10,
      title: "Sport Bike",
      subtitle: "Kalimantan",
      picture: "bike-2",
    },
    {
      id: 11,
      title: "Onthel",
      subtitle: "Malang",
      picture: "bike-3",
    },
    {
      id: 12,
      title: "Fixie Gray",
      subtitle: "Yogyakarta",
      picture: "bike-4",
    },
  ];
  render() {
    return (
      <>
        <Header />
        <main className="vehicle-types-container">
          <form autoComplete="off" className="vehicle-form">
            <input
              type="text"
              id="vehicleName"
              name="vehicleName"
              placeholder="Search vehicle (ex. cars, cars name)"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </form>
          <section className="vehicle-list">
            <div className="d-flex justify-content-between popular-title-container">
              <div className="popular-title">Popular in Town</div>
              <Link to={`#`} className="text-view">
                View all <span className="fw-bolder">&nbsp;&nbsp;&gt;</span>
              </Link>
            </div>
            <div className="row justify-content-around align-items-center mb-5">
              {this.popular.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    item={data.picture}
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
              {this.cars.map((data) => {
                return (
                  <Card
                    key={data.id}
                    link={`/detail/${data.id}`}
                    item={data.picture}
                    title={data.title}
                    subtitle={data.subtitle}
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
              {this.motorcycle.map((data) => {
                return (
                  <Card
                    key={data.id}
                    // link={`/detail/${data.id}`}
                    link={"/detail"}
                    item={data.picture}
                    title={data.title}
                    subtitle={data.subtitle}
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
              {this.bike.map((data) => {
                return (
                  <Card
                    key={data.id}
                    // link={`/detail/${data.id}`}
                    link={"/detail"}
                    item={data.picture}
                    title={data.title}
                    subtitle={data.subtitle}
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
