"use client";

import React, { useState, useEffect } from "react";

const BouncingLogoComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [color, setColor] = useState("#0074d9");

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "black"
  };

  const logoStyle = {
    position: "absolute",
    width: "100px",
    height: "50px",
    backgroundColor: color,
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    userSelect: "none",
    cursor: "pointer",
    animation: "bounce 2s infinite",
    left: position.x + "px",
    top: position.y + "px",
  };

  useEffect(() => {
    const handleAnimation = () => {
      // Calculate new position
      const newX = position.x + 5 * direction.x;
      const newY = position.y + 5 * direction.y;
      let hitBoundary = false;

      // Check boundaries
      if (newX <= 0 || newX >= window.innerWidth - 100) {
        setDirection((prev) => ({ ...prev, x: -prev.x }));
        hitBoundary = true;
      }
      if (newY <= 0 || newY >= window.innerHeight - 50) {
        setDirection((prev) => ({ ...prev, y: -prev.y }));
        hitBoundary = true;
      }

      // Update position
      setPosition({ x: newX, y: newY });

      if (hitBoundary) {
        setColor(`#${Math.floor(Math.random()*16777215).toString(16)}`); // Generate a random color
      }
    };

    // Start animation loop
    const animationLoop = setInterval(handleAnimation, 1000 / 60);

    // Clean up on unmount
    return () => clearInterval(animationLoop);
  }, [position, direction]);

  return (
    <div style={containerStyle}>
      <div style={logoStyle}>DVD</div>
    </div>
  );
};

export default BouncingLogoComponent;