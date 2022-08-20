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
    if (isReset.current) {
      handleReset();
      resetCounter();
    }
    if (counter === 0 && counter < currQuestionCounter) {
      updateTimeout();
      setTimeout(() => {
        updateTimeout();
        handleTimeout();
        resetCounter();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return (
    <div className="flex items-center justify-center p-4 border-2 rounded-full w-16 h-16 mb-8 border-neutral-900">
      <p className="p-4 text-2xl">{counter}</p>
    </div>
  );
};

export default Timer;
