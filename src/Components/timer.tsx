import { useEffect, useState } from "react";
interface TimerProps {
  count: number;
}
const Timer = ({ count }: TimerProps) => {
  const [counter, decrementCounter] = useState(count);
  if (counter === 0) {
    console.log("timer at 0");
  }
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(counter);
      if (counter > 0) {
        decrementCounter((prevCount) => prevCount - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  return <p>{counter}</p>;
};

export default Timer;
