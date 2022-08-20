import { useState } from "react";
import AnswerOption from "./AnswerOption";
interface AnswerProps {
  AnswerOptions: Array<string>;
  correctAnswer: string;
  updateQuestionCounter: Function;
  handleReset: Function;
  isReset: React.MutableRefObject<boolean>;
  isTimeout: React.MutableRefObject<boolean>;
  incrementCurrCorrectAnswersCounter: Function;
}

const AnswerOptionsList = ({
  AnswerOptions,
  correctAnswer,
  updateQuestionCounter,
  handleReset,
  incrementCurrCorrectAnswersCounter,
  isReset,
  isTimeout,
}: AnswerProps) => {
  const [isClicked, setClicked] = useState(false);
  const shuffleArray = (array: Array<string>) => {
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
  function handleClick(item: string) {
    if (correctAnswer === item) {
      incrementCurrCorrectAnswersCounter();
    }
    handleReset();
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
          isTimeout={isTimeout}
          isReset={isReset}
        >
          {item}
        </AnswerOption>
      ))}
    </div>
  );
};
export default AnswerOptionsList;
