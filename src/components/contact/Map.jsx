import React from "react";

const Map = () => {
  return (
    <div className="map">
    <div className="full-width m-auto">
      <div className="p-w__content">
        <iframe
          className="d-block w-100 h-100 b-none mi-h mi-h-xs"
          loading="lazy"
          scrolling="no"
          title="Brooklyn, NY, USA"
          src="https://maps.google.com/maps?z=14&t=roadmap&q=Brooklyn, NY, USA&ie=UTF8&output=embed"
          style={{ minHeight: "40vh", minHeightXs: "35vh" }}
        />
      </div>
      </div>
    </div>
  );
};

export default Map;
