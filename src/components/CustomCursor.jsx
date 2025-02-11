import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    let animationFrame;
    const smoothTrail = () => {
      setTrailPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(smoothTrail);
    };

    smoothTrail();
    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setHover(true);
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setHover(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="cursor-fixed">
      <div className="cursor-fixed__wrap">
        <div
          className={`cursor cursor--large ${hover ? "hover" : ""}`}
          style={{
            transform: `translate(-50%, -50%) translate(${trailPosition.x}px, ${trailPosition.y}px)`,
          }}
        />
        <div
          className={`cursor cursor--small ${hover ? "hover" : ""}`}
          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
            opacity: hover ? 0 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
