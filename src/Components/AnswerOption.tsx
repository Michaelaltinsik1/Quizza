import { useState } from "react";

interface AnswerProps {
  children: React.ReactNode;
  correctAnswer: string;
}

enum Guess {
  CORRECT,
  INCORRECT,
  NOTGUESSED,
}

const AnswerOption = ({ children, correctAnswer }: AnswerProps) => {
  const [GuessState, setGuessState] = useState<Guess>(Guess.NOTGUESSED);

  function handleClick(correctAnswer: string, children: React.ReactNode) {
    if (children === correctAnswer) {
      setGuessState(Guess.CORRECT);
    } else {
      setGuessState(Guess.INCORRECT);
    }
  }
  return (
    <button
      onClick={() => handleClick(correctAnswer, children)}
      // className={`border-solid border-2 border-black rounded-md p-3 m-3`}
      className={
        GuessState === Guess.CORRECT
          ? `bg-green-400`
          : GuessState === Guess.INCORRECT
          ? `bg-red-600`
          : ""
      }
    >
      {children}
    </button>
  );
};
export default AnswerOption;
