import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './Animation.css'; // Import custom CSS for the ball and field

const fieldWidth = 800;
const fieldHeight = 500;
const diameter = 100;

const maxLeft = fieldWidth - diameter - 2;
const maxTop = fieldHeight - diameter - 2;
const vx = 5;
const vy = 5;

function Animation() {
  // State variables
  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ballImage, setBallImage] = useState("");

  // Toggle running state
  const toggleRun = () => {
    setRunning(!running);
  };

  // Calculate ball position
  const calculate = () => {
    let newX = x;
    let newY = y;
    let newGoRight = goRight;
    let newGoDown = goDown;

    if (newGoRight) {
      newX += vx;
      if (newX >= maxLeft) {
        newGoRight = false;
      }
    } else {
      newX -= vx;
      if (newX <= 0) {
        newGoRight = true;
      }
    }

    if (newGoDown) {
      newY += vy;
      if (newY >= maxTop) {
        newGoDown = false;
      }
    } else {
      newY -= vy;
      if (newY <= 0) {
        newGoDown = true;
      }
    }

    setX(newX);
    setY(newY);
    setGoRight(newGoRight);
    setGoDown(newGoDown);
  };

  // Update ball position and style
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        calculate();
      }, 25);
      return () => clearInterval(interval); // Cleanup interval on stop
    }
  }, [running, x, y, goRight, goDown]);

  // Initialize field and ball size
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case " ":
          toggleRun();
          break;
        case "0":
          setBallImage("");
          break;
        case "1":
          setBallImage("img/basketball1.webp");
          break;
        case "2":
          setBallImage("img/football.webp");
          break;
        case "3":
          setBallImage("img/vo.webp");
          break;
        case "4":
          setBallImage("img/myy.jpg");
          break;
        case "5":
          setBallImage("img/Untitled.png");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div id="container">
      <div
        id="field"
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          position: "relative",
          border: "2px solid black",
          margin: "0 auto",
        }}
      >
        <div
          id="ball"
          style={{
            width: `${diameter}px`,
            height: `${diameter}px`,
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            backgroundImage: `url(${ballImage})`,
            backgroundSize: "cover",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <div id="control" className="mt-3">
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-success"}`}
          onClick={toggleRun}
        >
          {running ? (
            <span className="bi bi-pause-fill">Pause</span>
          ) : (
            <span className="bi bi-play-fill">Run</span>
          )}
        </button>
        <button className="btn btn-light" onClick={() => setBallImage("")}>
          None
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("basketball1.webp")}
        >
          BasketBall
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("football.webp")}
        >
          FootBall
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("vo.webp")}
        >
          VoleyBall
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("myy.jpg")}
        >
          Human
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("cartoon.webp")}
        >
          Cartoon
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setBallImage("Untitled.png")}
        >
          Logo
        </button>
      </div>
    </div>
  );
}

export default Animation;