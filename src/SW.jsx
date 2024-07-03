import React, { useState, useEffect, useRef } from "react";
import "./SW.css";

const SW = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const toggleStopwatch = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    // Cleanup on component unmount
    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="SW">
      <h1>Stopwatch</h1>
      <div className="time">Time: {formatTime(time)}</div>
      <div className="controls">
        <button onClick={toggleStopwatch}>{running ? "Stop" : "Start"}</button>
        <button
          onClick={() => {
            clearInterval(timerRef.current);
            setRunning(false);
            setTime(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SW;
