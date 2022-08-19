import { quizType } from "../interfaces";
import AnswerOptionsList from "../Components/AnswerOptionsList";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../Components/timer";
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
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [isReset, setReset] = useState<boolean>(false);
  const [currQuestionCounter, incrementQuestionCounter] = useState<number>(1);
  const [quizSetUpData, setQuizSetupData] =
    useState<Array<quizSetupDataType> | null>(null);

  function clearStateForNewRound() {
    setGameOver(false);
    setReset(false);
    incrementQuestionCounter(1);
  }

  function handleReturn() {
    clearStateForNewRound();
    handleReturnHomePage();
  }
  function updateQuestionCounter() {
    let tempCounter = currQuestionCounter + 1;
    console.log(tempCounter);
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
    }, 50);
  }
  function handleReset() {
    setReset((prevState) => !prevState);
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
          console.log(tempStorage);
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

        // tempStorage = data.map((item: any) => {
        //   let tempStorage: quizSetupDataType;
        //   tempStorage = {
        //     correctAnswer: item.correctAnswer,
        //     incorrectAnswers: item.incorrectAnswers,
        //     question: item.question,
        //   };
        //   return tempStorage;
        // });
        // console.log(tempStorage);
        // setQuizSetupData(tempStorage);
      } catch {
        //setQuizSetupData(() => null);
      }
    };
    fetchData();
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
            <article>
              <Timer
                count={parseInt(quizState.time)}
                handleTimeout={handleTimeout}
                currQuestionCounter={currQuestionCounter}
                isReset={isReset}
                handleReset={handleReset}
              />
              <p>
                Question: {currQuestionCounter}/{quizState.amount}
              </p>
              <p>
                {quizSetUpData
                  ? quizSetUpData[currQuestionCounter - 1].question
                  : ""}
              </p>
            </article>
            <article>
              {/* {quizSetUpData ? quizSetUpData.map((item : quizSetupDataType) => <AnswerOption/> )} */}
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
                />
              )}
            </article>
          </main>
        </div>
      ) : (
        <section className="flex flex-col max-w-md justify-between p-6 items-center mt-10">
          <article className="flex flex-col">
            <h1>Congrats</h1>
            <p>Your score was 5/{quizState.amount}</p>
          </article>
          <article className="flex mt-6">
            <button
              onClick={clearStateForNewRound}
              className="flex items-center justify-center text-center p-6 border-2 border-black rounded-md px-2 py-2 m-2"
            >
              Play Again
            </button>
            <button
              onClick={handleReturn}
              className="flex items-center justify-center text-center p-6 border-2 border-black rounded-md px-2 py-2 m-2"
            >
              Return
            </button>
          </article>
        </section>
      )}
    </>
  );
};

export default QuizPage;
