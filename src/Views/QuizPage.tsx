import { quizType } from "../interfaces";
import AnswerOptionsList from "../Components/AnswerOptionsList";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Timer from "../Components/timer";
import GameOver from "../Components/GameOverComponent";
interface quizPageProps {
  quizState: quizType;
  handleReturnHomePage: Function;
}
interface quizSetupDataType {
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  question: string;
}
const QuizPage = ({ quizState, handleReturnHomePage }: quizPageProps) => {
  // const [currCorrectAnswersCounter, setCurrCorrectAnswersCounter] =
  //   useState<number>(0);
  console.log("rerender");
  const currCorrectAnswersCounter = useRef<number>(0);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  // const [isReset, setReset] = useState<boolean>(false);
  const isReset = useRef<boolean>(false);
  const isTimeout = useRef<boolean>(false);
  const [currQuestionCounter, incrementQuestionCounter] = useState<number>(1);
  const [quizSetUpData, setQuizSetupData] =
    useState<Array<quizSetupDataType> | null>(null);

  function clearStateForNewRound() {
    setGameOver(false);
    //setReset(false);
    isReset.current = false;
    incrementQuestionCounter(1);
    currCorrectAnswersCounter.current = 0;
  }
  function incrementCurrCorrectAnswersCounter() {
    //setCurrCorrectAnswersCounter((prevState) => prevState + 1);
    currCorrectAnswersCounter.current = currCorrectAnswersCounter.current + 1;
  }
  function handleReturn() {
    clearStateForNewRound();
    handleReturnHomePage();
  }
  function updateQuestionCounter() {
    let tempCounter = currQuestionCounter + 1;
    if (currQuestionCounter < parseInt(quizState.amount)) {
      incrementQuestionCounter(() => currQuestionCounter + 1);
    }
    if (tempCounter > parseInt(quizState.amount)) {
      setGameOver(true);
    }
  }
  function handleTimeout() {
    setTimeout(() => {
      updateQuestionCounter();
    }, 500);
  }
  function updateTimeout() {
    setTimeout(() => {
      isTimeout.current = !isTimeout.current;
    }, 500);
    isTimeout.current = !isTimeout.current;
  }
  function handleReset() {
    setTimeout(() => {
      isReset.current = !isReset.current;
    }, 500);
    isReset.current = !isReset.current;

    //isReset.current = !isReset.current;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let categoryModified: string = quizState.category
          .replaceAll(" ", "_")
          .replaceAll("&", "and");

        let tempStorage: Array<quizSetupDataType>;
        const iterate = (data: any) => {
          tempStorage = data.map((item: any) => {
            let tempStorage: quizSetupDataType;
            tempStorage = {
              correctAnswer: item.correctAnswer,
              incorrectAnswers: item.incorrectAnswers,
              question: item.question,
            };
            return tempStorage;
          });
          setQuizSetupData(tempStorage);
        };
        if (quizState.difficulty.toLocaleLowerCase() !== "none") {
          const { data } = await axios.get(
            `https://the-trivia-api.com/api/questions?categories=${categoryModified.toLocaleLowerCase()}&limit=${
              quizState.amount
            }&difficulty=${quizState.difficulty.toLocaleLowerCase()}`
          );
          iterate(data);
        } else {
          const { data } = await axios.get(
            `https://the-trivia-api.com/api/questions?categories=${categoryModified.toLocaleLowerCase()}&limit=${
              quizState.amount
            }`
          );
          iterate(data);
        }
      } catch {
        //setQuizSetupData(() => null);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isGameOver ? (
        <div className="p-8">
          <header className="flex flex-col items-center py-2">
            <h1 className="text-2xl text font-bold font-serif mt-4">Quizza</h1>
            <p className="ml-auto font-mono text-lg mt-5">
              {quizState.username}
            </p>
          </header>
          <main className="py-10">
            <article className="flex flex-col items-center">
              <Timer
                count={parseInt(quizState.time)}
                handleTimeout={handleTimeout}
                currQuestionCounter={currQuestionCounter}
                isReset={isReset}
                isTimeout={isTimeout}
                handleReset={handleReset}
                updateTimeout={updateTimeout}
              />
              <p className="text-lg">
                Question: {currQuestionCounter}/{quizState.amount}
              </p>
              <p className="text-center my-4 text-lg">
                {quizSetUpData
                  ? quizSetUpData[currQuestionCounter - 1].question
                  : ""}
              </p>
            </article>
            <article>
              {quizSetUpData && (
                <AnswerOptionsList
                  AnswerOptions={[
                    quizSetUpData[currQuestionCounter - 1].correctAnswer,
                    ...quizSetUpData[currQuestionCounter - 1].incorrectAnswers,
                  ]}
                  correctAnswer={
                    quizSetUpData[currQuestionCounter - 1].correctAnswer
                  }
                  updateQuestionCounter={updateQuestionCounter}
                  handleReset={handleReset}
                  incrementCurrCorrectAnswersCounter={
                    incrementCurrCorrectAnswersCounter
                  }
                  isReset={isReset}
                  isTimeout={isTimeout}
                />
              )}
            </article>
          </main>
        </div>
      ) : (
        <GameOver
          quizState={quizState}
          currCorrectAnswersCounter={currCorrectAnswersCounter}
          clearStateForNewRound={clearStateForNewRound}
          handleReturn={handleReturn}
        />
      )}
    </>
  );
};

export default QuizPage;
