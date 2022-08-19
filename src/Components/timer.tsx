import { useEffect, useState } from "react";
interface TimerProps {
  count: number;
  handleTimeout: Function;
  currQuestionCounter: number;
  isReset: boolean;
  handleReset: Function;
}
const Timer = ({
  count,
  handleTimeout,
  currQuestionCounter,
  isReset,
  handleReset,
}: TimerProps) => {
  const [counter, setCounter] = useState(count);
  if (counter === 0 && counter < currQuestionCounter) {
    resetCounter();
    handleTimeout();
  }
  // if (isReset) {
  //   handleReset();
  //   resetCounter();
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
    if (isReset) {
      handleReset();
      resetCounter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return <p>{counter}</p>;
};

export default Timer;
