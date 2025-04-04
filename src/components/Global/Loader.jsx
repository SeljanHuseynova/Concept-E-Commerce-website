import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="loader">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(
      160deg,
      var(--fourth-primary-color) 40%,
      var(--secondary-color) 100%
    );
  }

  .loader {
    width: 80px;
    height: 80px;
    position: relative;
  }

  .loader .circle {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: pulse 1.2s infinite ease-in-out;
  }

  .loader .circle:nth-child(1) {
    top: 0;
    left: 30px;
    background-color: var(--third-primary-color);
    background-image: linear-gradient(
      43deg,
      var(--second-text-color) 0%,
      var(--third-primary-color) 46%,
      var(--primary-color) 100%
    );
    box-shadow: 0px 20px 30px -10px rgba(164, 137, 137, 0.3);
  }

  .loader .circle:nth-child(2) {
    top: 30px;
    left: 60px;
    background-color: var(--second-primary-color);
    background-image: linear-gradient(
      43deg,
      var(--third-primary-color) 0%,
      var(--second-text-color) 46%,
      var(--second-primary-color) 100%
    );
    box-shadow: 0px 20px 30px -10px rgba(155, 126, 126, 0.3);
  }

  .loader .circle:nth-child(3) {
    top: 60px;
    left: 30px;
    background-color: var(--third-primary-color);
    background-image: linear-gradient(
      43deg,
      var(--primary-color) 0%,
      var(--second-text-color) 46%,
      var(--fourth-primary-color) 100%
    );
    box-shadow: 0px 20px 30px -10px rgba(158, 111, 111, 0.3);
  }

  .loader .circle:nth-child(4) {
    top: 30px;
    left: 0;
    background-color: var(--third-primary-color);
    background-image: linear-gradient(
      43deg,
      var(--primary-color) 0%,
  var(--second-text-color)46%,
      var(--fourth-primary-color) 100%
    );
    box-shadow: 0px 20px 30px -10px rgba(150, 135, 135, 0.3);
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.2);
      opacity: 0.5;
    }

    100% {
      transform: scale(1);
    }
  }
`;

export default Loader;
