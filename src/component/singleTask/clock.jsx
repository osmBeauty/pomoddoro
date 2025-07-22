import { useState } from "react";
import "./clock.css";
import StopWatch from "../StopWatch/stopWatch";
const Clock = ({timer}) => {
  const [isRunning, setIsRunning] = useState(false);
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="clockwrapper">
        <div className="clock_border d-flex text-center flex-column">
          <div onClick={startAndStop}>
            <StopWatch
              countDown={timer}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
