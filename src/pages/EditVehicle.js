import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import backIcon from "../assets/img/icon/arrow-left.png";
import { connect, useDispatch, useSelector } from "react-redux";
import CounterButton from "../components/CounterButton";
import { countDownAction, countUpAction } from "../redux/actionCreators/count";
import cameraIcon from "../assets/img/icon/camera-icon.png";
import { patchVehicleAction } from "../redux/actionCreators/vehicles";
import axios from "axios";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";

function EditVehicle(props) {
  const url = process.env.REACT_APP_BASE_URL;
  const { id } = props.match.params;

  const counter = useSelector((reduxState) => reduxState.count);
  const dispatch = useDispatch();

  const [mainPic, setMainPic] = useState("");
  const [secondPic, setSecondPic] = useState("");
  const [thirdPic, setThirdPic] = useState("");
  const [mainPicBackground, setMainPicBackground] = useState("");
  const [secondPicBackground, setSecondPicBackground] = useState("");
  const [thirdPicBackground, setThirdPicBackground] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleLocation, setvehicleLocation] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [vehicleAmount, setvehicleAmount] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const hiddenFileInput1 = React.useRef(null);
  const hiddenFileInput2 = React.useRef(null);
  const hiddenFileInput3 = React.useRef(null);

  useEffect(() => {
    axios
      .get(`${url}/vehicles`, {
        params: { id: String(id) },
      })
      .then(({ data }) => {
        const arrayResult = data.result.data[0];
        if (arrayResult.picture) {
          setMainPicBackground(url + arrayResult.picture.split(",")[0]);
          setSecondPicBackground(arrayResult.picture.split(",")[1]);
          setThirdPicBackground(arrayResult.picture.split(",")[2]);
        }
        arrayResult.model && setVehicleName(arrayResult.model);
        arrayResult.location && setvehicleLocation(arrayResult.location);
        arrayResult.description &&
          setVehicleDescription(arrayResult.description);
        arrayResult.price && setVehiclePrice(arrayResult.price);
        setvehicleAmount(arrayResult.amount_available);
        localStorage.setItem(
          "vehicleData",
          JSON.stringify({ amount_available: 100 })
        );
        switch (arrayResult.category) {
          case "Cars":
            setvehicleType("1");
            break;
          case "Motorcycle":
            setvehicleType("2");
            break;
          case "Bicycle":
            setvehicleType("3");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, url]);

  const mainPicHandler = (e) => {
    setMainPic(hiddenFileInput1.current.click());
  };
  const secondPicHandler = (e) => {
    setSecondPic(hiddenFileInput2.current.click());
  };
  const thirdPicHandler = (e) => {
    setThirdPic(hiddenFileInput3.current.click());
  };
  const onSubmit = () => {
    if (vehicleType === "" || vehicleType === "categoryTitle") {
      return window.alert("Please Choose Vehicle Type!");
    }
    setvehicleAmount(counter.number);
    const form = new FormData();
    form.append("model", vehicleName);
    form.append("owner", props.auth.authInfo.user_id);
    form.append("location", vehicleLocation);
    vehicleDescription && form.append("description", vehicleDescription);
    form.append("price", vehiclePrice);
    form.append("amount_available", vehicleAmount);
    form.append("type_id", vehicleType);
    mainPic && form.append("picture", mainPic);
    secondPic && form.append("picture", secondPic);
    thirdPic && form.append("picture", thirdPic);
    props.patchVehicleAction(form, id);
    Swal.fire("Vehicle Edited", "", "success");
  };
  return (
    <>
      <Header />
      {!vehicleName && (
        <div className="loader view-detail-loader">
          <Loader type="TailSpin" color="#ffcd61" height={125} width={125} />
        </div>
      )}
      {vehicleName && (
        <main className="add-vehicle-main">
          <section className="d-flex reservation-title">
            <Link to="/" className="d-flex align-items-center">
              <img src={backIcon} alt="" />
            </Link>
            <span>Edit item</span>
          </section>
          <section className="d-flex flex-row add-vehicle-container my-4">
            <div className="add-image-container d-flex flex-column align-items-center justify-content-center">
              <img
                style={{
                  cursor: "pointer",
                }}
                src={mainPicBackground}
                onClick={mainPicHandler}
                className="add-main-image d-flex align-items-center flex-column justify-content-center"
                alt=""
              />
              <input
                className="d-none"
                name="vehicle-photo"
                ref={hiddenFileInput1}
                type="file"
                onChange={(value) => {
                  if (value.target.files[0]) {
                    setMainPic(value.target.files[0]);
                    setMainPicBackground(
                      URL.createObjectURL(value.target.files[0])
                    );
                  }
                }}
              />
              <div className="add-alt-image-container d-flex justify-content-between">
                <div
                  onClick={secondPicHandler}
                  style={{
                    cursor: "pointer",
                  }}
                  className="add-alt-image1"
                >
                  {secondPicBackground && (
                    <img
                      alt=""
                      src={
                        secondPicBackground?.includes("/img")
                          ? url + secondPicBackground
                          : secondPicBackground
                      }
                      className="second-pic-edit"
                    />
                  )}
                  {!secondPicBackground && (
                    <div className="cam-container">
                      <img alt="" src={cameraIcon} className="cam-icon" />
                      <text>Click to add image</text>
                    </div>
                  )}
                </div>
                <input
                  className="d-none"
                  ref={hiddenFileInput2}
                  type="file"
                  onChange={(value) => {
                    if (value.target.files[0]) {
                      setSecondPic(value.target.files[0]);
                      setSecondPicBackground(
                        URL.createObjectURL(value.target.files[0])
                      );
                    }
                  }}
                />
                <div
                  onClick={thirdPicHandler}
                  style={{
                    cursor: "pointer",
                  }}
                  className="add-alt-image1"
                >
                  {thirdPicBackground && (
                    <img
                      alt=""
                      src={
                        thirdPicBackground?.includes("/img")
                          ? url + thirdPicBackground
                          : thirdPicBackground
                      }
                      className="second-pic-edit"
                    />
                  )}
                  {!thirdPicBackground && (
                    <div className="cam-container">
                      <>
                        <div>+</div>
                        Add more
                      </>
                    </div>
                  )}
                </div>
                <input
                  className="d-none"
                  ref={hiddenFileInput3}
                  type="file"
                  onChange={(value) => {
                    if (value.target.files[0]) {
                      setThirdPic(value.target.files[0]);
                      setThirdPicBackground(
                        URL.createObjectURL(value.target.files[0])
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-column add-vehicle-detail-container justify-content-between pb-5 fs-4">
              <input
                type="text"
                name="vehicleName"
                placeholder="Name (max up to 50 words)"
                value={vehicleName}
                onChange={(value) => setVehicleName(value.target.value)}
              />
              <input
                type="text"
                name="vehicleLocation"
                placeholder="Location"
                value={vehicleLocation}
                onChange={(value) => setvehicleLocation(value.target.value)}
              />
              <input
                type="text"
                name="vehicleDescription"
                placeholder="Description (max up to 150 words)"
                value={vehicleDescription}
                onChange={(value) => setVehicleDescription(value.target.value)}
              />
              <div>
                <p>Price:</p>
                <input
                  className="vehiclePrice"
                  type="number"
                  name="vehiclePrice"
                  placeholder="Type the price"
                  value={vehiclePrice}
                  onChange={(value) => setVehiclePrice(value.target.value)}
                />
              </div>
              <div className="vehicle-stock d-flex">
                <p>Stock:</p>
                <CounterButton
                  onClickRemove={() => {
                    dispatch(countDownAction());
                    setvehicleAmount(counter.number - 1);
                  }}
                  onClickAdd={() => {
                    dispatch(countUpAction());
                    setvehicleAmount(counter.number + 1);
                  }}
                  value={counter.number}
                />
              </div>
            </div>
          </section>
          <section className="add-vehicle-button d-flex justify-content-center my-4">
            <select
              className="add-item-button"
              name="vehicleCategory"
              defaultValue={vehicleType}
              onChange={(value) => {
                setvehicleType(value.target.value);
              }}
            >
              <option hidden value="categoryTitle">
                Choose Category
              </option>
              <option value="1">Cars</option>
              <option value="2">Motorbike</option>
              <option value="3">Bike</option>
            </select>
            <button className="save-item-button " onClick={onSubmit}>
              Save item
            </button>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    patchVehicleAction: (body, params) => {
      dispatch(patchVehicleAction(body, params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditVehicle));
