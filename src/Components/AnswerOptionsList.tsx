import { useState } from "react";
import AnswerOption from "./AnswerOption";
interface AnswerProps {
  AnswerOptions: Array<string>;
  correctAnswer: string;
  updateQuestionCounter: Function;
}

const AnswerOptionsList = ({
  AnswerOptions,
  correctAnswer,
  updateQuestionCounter,
}: AnswerProps) => {
  const [isClicked, setClicked] = useState(false);
  const shuffleArray = (array: Array<string>) => {
    console.log("ran");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  if (!isClicked) {
    shuffleArray(AnswerOptions);
  }
  function handleClick() {
    setClicked(() => true);
    setTimeout(() => {
      setClicked(() => false);
      updateQuestionCounter();
    }, 1000);
  }
  return (
    <div className="grid grid-cols-2">
      {AnswerOptions.map((item: string) => (
        <AnswerOption
          key={item}
          correctAnswer={correctAnswer}
          handleClick={handleClick}
          isClicked={isClicked}
        >
          {item}
        </AnswerOption>
      ))}
    </div>
  );
};
export default AnswerOptionsList;
