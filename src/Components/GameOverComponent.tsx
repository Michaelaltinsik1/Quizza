import { quizType } from "../interfaces";

interface GameOverProps {
  quizState: quizType;
  currCorrectAnswersCounter: React.MutableRefObject<number>;
  clearStateForNewRound: Function;
  handleReturn: Function;
}

enum QuizResult {
  REVISEAGAIN = "Revise again!",
  YOUCANBETER = "You can do beter!",
  IMPRESSIVE = "Impressive!",
  GODTIER = "Godtier!",
}

const GameOver = ({
  quizState,
  currCorrectAnswersCounter,
  clearStateForNewRound,
  handleReturn,
}: GameOverProps) => {
  function handleComputation(): QuizResult {
    let computedRest =
      currCorrectAnswersCounter.current / parseInt(quizState.amount);
    if (computedRest <= 0.25) {
      return QuizResult.REVISEAGAIN;
    } else if (computedRest > 0.25 && computedRest <= 0.5) {
      return QuizResult.YOUCANBETER;
    } else if (computedRest > 0.5 && computedRest <= 0.75) {
      return QuizResult.IMPRESSIVE;
    } else {
      return QuizResult.GODTIER;
    }
  }
  return (
    <section className="flex flex-col max-w-md justify-between p-6 items-center mt-10">
      <article className="flex flex-col">
        <h1>{handleComputation()}</h1>
        <p>
          Your score was {currCorrectAnswersCounter.current}/{quizState.amount}
        </p>
      </article>
      <article className="flex mt-6">
        <button
          onClick={() => clearStateForNewRound()}
          className="flex items-center justify-center text-center p-6 border-2 border-black rounded-md px-2 py-2 m-2"
        >
          Try again
        </button>
        <button
          onClick={() => handleReturn()}
          className="flex items-center justify-center text-center p-6 border-2 border-black rounded-md px-2 py-2 m-2"
        >
          Home
        </button>
      </article>
    </section>
  );
};

export default GameOver;
