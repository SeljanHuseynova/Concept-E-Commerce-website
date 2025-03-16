import React from "react";

const GetInTouch = () => {
  return (
    <div className="get-in-touch">
      <h3>Please Do Get In Touch!</h3>
      <p>
        We'd love to hear from you. Please use the form to send us your message
        or ideaas. Or simply pop in for a cup of fresh tea and a cookie:
      </p>
      <div className="opening-hours">
        <h6>Opening Hours:</h6>
        <div className="top">
          <span>Monday to Saturday: 9am - 10pm</span>
          <span>Sundays: 10am - 6pm</span>
        </div>
        <div className="bottom">
          <span>Email: example@example.com</span>
          <span>Call us: (012)-345-6789</span>
        </div>
      </div>
      <div className="heard-quarter">
        <h6>Headquarter:</h6>
        <div className="top">
          <span>1669 Ave Dermentum, Onsectetur Sagittis,</span>
          <span>CA 880986, United State</span>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
