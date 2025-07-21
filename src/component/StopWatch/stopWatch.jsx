import { useState, useEffect } from "react";
import "./stopWatch.css";

const StopWatch = ({ countDown , page }) => {
  const [time, setTime] = useState(countDown);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setTime(countDown);
    setIsComplete(false);
    setIsRunning(false);
  }, [countDown]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time - 1), 10);
    }
    if (time === 0) {
      clearInterval(intervalId);
      setIsComplete(true);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      {isComplete ? (
        <p className="text-center">Task Completed</p>
      ) : (
        <div className="stopwatch-container">
          <p className="stopwatch-time m-0">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
          {/* <div className="stopwatch-buttons p-auto">
            <button className="btn btn-dark" onClick={startAndStop}>
              {isRunning ? (
                <i className="fa-solid fa-pause"></i>
              ) : (
                <i className="fa-solid fa-play"></i>
              )}
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default StopWatch;
