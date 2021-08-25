import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import backIcon from "../assets/img/icon/arrow-left.png";
import cameraIcon from "../assets/img/icon/camera-icon.png";

class ChatDetail extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="reserve-container">
          <div className="d-flex reservation-title align-items-center">
            <Link to="/">
              <img src={backIcon} alt="" />
            </Link>
            <div className="profile-photo chat-detail-profile-icon"></div>
            <span>Rental 1</span>
          </div>
          <section className="d-flex chat-item mt-5">
            <div className="chat-item-pic">
              <img
                src="https://user-images.githubusercontent.com/38064315/130670231-c21ab040-c192-45a1-b882-7448866b9b80.jpg"
                alt=""
              />
            </div>
            <div className="chat-item-details">
              <p className="reserve-vehicle-name">
                Fixie - Gray Only <br />
                <span>Yogyakarta</span>
              </p>
              <p className="available-color">Available</p>
            </div>
            <div className="chat-item-name mt-auto text-end">
              Rp. 78.000/day
            </div>
          </section>
          <section className="chats mt-5">
            <div className="d-flex flex-row-reverse">
              <div className="chat-user">How many bike left?</div>
            </div>
            <div className="d-flex flex-row-reverse">
              <div className="time-delivered">Read [12.30 PM]</div>
            </div>
            <div className="d-flex flex-row">
              <div className="chat-renter">We only have 2 bikes left</div>
            </div>
            <div className="d-flex flex-row">
              <div className="time-delivered">12.30 PM</div>
            </div>
          </section>
          <section className="chat-section">
            <form className="chat-form mt-5">
              <input
                type="text"
                id="chatMessage"
                name="chatMessage"
                placeholder="Type a message"
                autoComplete="off"
              />
            </form>
            <button>
              <img alt="" src={cameraIcon} />
            </button>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default ChatDetail;
