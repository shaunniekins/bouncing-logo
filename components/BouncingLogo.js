"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Button, useDisclosure } from "@nextui-org/react";

const BouncingLogoComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [color, setColor] = useState("#0074d9");
  const [text, setText] = useState("DVD");
  const [speed, setSpeed] = useState(5);
  const [textSize, setTextSize] = useState(5);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Load settings from local storage on initial render
  useEffect(() => {
    const storedText = localStorage.getItem("text");
    const storedSpeed = localStorage.getItem("speed");
    const storedTextSize = localStorage.getItem("textSize");

    if (storedText) setText(storedText);
    if (storedSpeed) setSpeed(parseInt(storedSpeed));
    if (storedTextSize) setTextSize(parseInt(storedTextSize));
  }, []);

  // Animation logic remains the same
  useEffect(() => {
    const handleAnimation = () => {
      const newX = position.x + speed * direction.x;
      const newY = position.y + speed * direction.y;
      let hitBoundary = false;

      if (newX <= 0 || newX >= window.innerWidth - 100) {
        setDirection((prev) => ({ ...prev, x: -prev.x }));
        hitBoundary = true;
      }
      if (newY <= 0 || newY >= window.innerHeight - 50) {
        setDirection((prev) => ({ ...prev, y: -prev.y }));
        hitBoundary = true;
      }

      setPosition({ x: newX, y: newY });

      if (hitBoundary) {
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      }
    };

    const animationLoop = setInterval(handleAnimation, 1000 / 60);

    return () => clearInterval(animationLoop);
  }, [position, direction, speed]);

  const resetSettings = () => {
    setText("DVD");
    setSpeed(5);
    setTextSize(5);
  };

  const handleDoubleClick = () => {
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "text":
        setText(value);
        break;
      case "speed":
        setSpeed(parseInt(value));
        break;
      case "textSize":
        setTextSize(parseInt(value));
        break;
      default:
        break;
    }
  };

  const saveSettings = () => {
    localStorage.setItem("text", text);
    localStorage.setItem("speed", speed.toString());
    localStorage.setItem("textSize", textSize.toString());
    onClose();
  };

  const handleCloseSettings = () => {
    onClose();
  };

  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-black"
      onDoubleClick={handleDoubleClick}
    >
      <div
        style={{
          color: color,
          left: `${position.x}px`,
          top: `${position.y}px`,
          fontSize: `${textSize}em`,
        }}
        className="absolute flex justify-center items-center text-5xl font-bold select-none animate-bounce"
      >
        {text}
      </div>
      {/* Settings Popup/Modal */}
      <Modal isOpen={isOpen} onClose={onClose} className="text-white bg-black border border-gray-500">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody className="grid w-full" style={{ gridTemplateColumns: "auto 1fr" }}>
                <label className="flex gap-3 items-center">
                  Text:
                </label>
                  <input
                    type="text"
                    name="text"
                    value={text}
                    className="rounded-lg py-1 px-2 text-white  bg-gray-700"
                    onChange={handleInputChange}
                  />

                <label className="flex gap-3 items-center">
                  Speed:
                </label>
                  <input
                    type="number"
                    name="speed"
                    value={speed}
                    className="rounded-lg py-1 px-2 text-white  bg-gray-700"
                    onChange={handleInputChange}
                  />

                <label className="flex gap-3 items-center">
                  Text Size:
                </label>
                  <input
                    type="number"
                    name="textSize"
                    value={textSize}
                    className="rounded-lg py-1 px-2 text-white  bg-gray-700"
                    onChange={handleInputChange}
                  />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleCloseSettings}>
                  Close
                </Button>
                <Button color="warning" onClick={resetSettings}>
                  Reset Settings
                </Button>
                <Button 
                  color="success" 
                  onClick={saveSettings}
                  disabled={!text || speed === 0 || textSize === 0}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BouncingLogoComponent;
