import { useEffect, useState } from "react";
interface TimerProps {
  count: number;
  handleTimeout: Function;
  currQuestionCounter: number;
  isReset: React.MutableRefObject<boolean>;
  isTimeout: React.MutableRefObject<boolean>;
  handleReset: Function;
  updateTimeout: Function;
}
const Timer = ({
  count,
  handleTimeout,
  currQuestionCounter,
  isReset,
  handleReset,
  updateTimeout,
}: TimerProps) => {
  const [counter, setCounter] = useState(count);
  console.log("rerender");
  // if (counter === 0 && counter < currQuestionCounter) {
  //   //resets timer on timeout
  //   console.log("timeout");
  //   setTimeout(() => {
  //     handleReset();
  //     handleTimeout();
  //     resetCounter();
  //   }, 50);
  // }
  // if (isReset.current) {
  //   // handles onclick timer reset
  //   console.log("2");
  //   setTimeout(() => {
  //     //resetCounter();
  //     //handleReset();
  //   }, 50);
  // }

  function resetCounter() {
    setCounter(count);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter((prevCount) => prevCount - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  useEffect(() => {
    // console.log("run useEffect");
    if (isReset.current) {
      handleReset();
      resetCounter();
    }
    if (counter === 0 && counter < currQuestionCounter) {
      //resets timer on timeout
      console.log("timeout");

      updateTimeout();
      setTimeout(() => {
        updateTimeout();
        handleTimeout();
        resetCounter();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return <p>{counter}</p>;
};

export default Timer;
