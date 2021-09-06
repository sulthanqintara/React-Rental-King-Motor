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

function EditVehicle(props) {
  const url = `${process.env.REACT_APP_BASE_URL}/vehicles`;
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
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleAmount, setvehicleAmount] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const hiddenFileInput1 = React.useRef(null);
  const hiddenFileInput2 = React.useRef(null);
  const hiddenFileInput3 = React.useRef(null);

  useEffect(() => {
    axios
      .get(url, {
        params: { id: String(id) },
      })
      .then(({ data }) => {
        const arrayResult = data.result[0];
        arrayResult.picture &&
          setMainPicBackground(arrayResult.picture.split(",")[0]);
        arrayResult.picture &&
          setSecondPicBackground(arrayResult.picture.split(",")[1]);
        arrayResult.picture &&
          setThirdPicBackground(arrayResult.picture.split(",")[2]);
        arrayResult.model && setVehicleName(arrayResult.model);
        arrayResult.location && setvehicleLocation(arrayResult.location);
        arrayResult.description &&
          setVehicleDescription(arrayResult.description);
        arrayResult.price && setVehiclePrice(arrayResult.price);
        setvehicleAmount(arrayResult.amount_available);
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
  };
  return (
    <>
      <Header />
      <main className="add-vehicle-main">
        <section className="d-flex reservation-title">
          <Link to="/" className="d-flex align-items-center">
            <img src={backIcon} alt="" />
          </Link>
          <span>Edit item</span>
        </section>
        <section className="d-flex flex-row add-vehicle-container my-4">
          <div className="add-image-container d-flex flex-column align-items-center justify-content-center">
            <div
              style={{
                cursor: "pointer",
                backgroundImage: `url(${mainPicBackground})`,
              }}
              onClick={mainPicHandler}
              className="add-main-image d-flex align-items-center flex-column justify-content-center"
            />
            <input
              className="d-none"
              name="vehicle-photo"
              ref={hiddenFileInput1}
              type="file"
              onChange={(value) => setMainPic(value.target.files[0])}
            />
            <div className="add-alt-image-container d-flex justify-content-between">
              <div
                onClick={secondPicHandler}
                style={{
                  cursor: "pointer",
                  backgroundImage: `url(${secondPicBackground})`,
                }}
                className="add-alt-image1 d-flex align-items-center flex-column justify-content-center"
              >
                {secondPicBackground ? (
                  ""
                ) : (
                  <>
                    <img alt="" src={cameraIcon} />
                    Click to add image
                  </>
                )}
              </div>
              <input
                className="d-none"
                ref={hiddenFileInput2}
                type="file"
                onChange={(value) => setSecondPic(value.target.files[0])}
              />
              <div
                onClick={thirdPicHandler}
                style={{
                  cursor: "pointer",
                  backgroundImage: `url(${thirdPicBackground})`,
                }}
                className="d-flex flex-column justify-content-center add-alt-image2 text-center"
              >
                {thirdPicBackground ? (
                  ""
                ) : (
                  <>
                    <div>+</div>
                    Add more
                  </>
                )}
              </div>
              <input
                className="d-none"
                ref={hiddenFileInput3}
                type="file"
                onChange={(value) => setThirdPic(value.target.files[0])}
              />
            </div>
          </div>
          <div className="d-flex flex-column add-vehicle-detail-container">
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
            <p>Price:</p>
            <input
              className="vehiclePrice"
              type="number"
              name="vehiclePrice"
              placeholder="Type the price"
              value={vehiclePrice}
              onChange={(value) => setVehiclePrice(value.target.value)}
            />
            <p>Status:</p>
            <select
              className="vehicle-status"
              name="vehicleStatus"
              defaultValue="statusTitle"
              onChange={(value) => {
                setVehicleStatus(value.target.value);
              }}
            >
              <option value="statusTitle" disabled>
                Select status
              </option>
              <option value="available">Available</option>
              <option value="fullBooked">Full Booked</option>
            </select>
            <div className="vehicle-stock d-flex">
              <p>Stock:</p>
              <CounterButton
                oonClickRemove={() => {
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
