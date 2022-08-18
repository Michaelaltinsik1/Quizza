import { quizType } from "../interfaces";
import AnswerOptionsList from "../Components/AnswerOptionsList";
import { useEffect, useState } from "react";
import axios from "axios";
import Timer from "../Components/timer";
interface quizPageProps {
  quizState: quizType;
}
interface quizSetupDataType {
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  question: string;
}
const QuizPage = ({ quizState }: quizPageProps) => {
  const [currQuestionCounter, incrementQuestionCounter] = useState<number>(1);
  const [quizSetUpData, setQuizSetupData] =
    useState<Array<quizSetupDataType> | null>(null);

  function updateQuestionCounter() {
    if (currQuestionCounter < parseInt(quizState.amount)) {
      incrementQuestionCounter(() => currQuestionCounter + 1);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tempStorage: Array<quizSetupDataType>;
        const { data } = await axios.get(
          "https://the-trivia-api.com/api/questions?categories=arts_and_literature&limit=10&difficulty=easy"
        );
        console.log(data);
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
      } catch {
        //setQuizSetupData(() => null);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <header className="flex flex-col items-center py-2">
        <h1 className="text-2xl text font-bold font-serif mt-4">Quizza</h1>
        <p className="ml-auto font-mono text-lg mt-5">{quizState.username}</p>
      </header>
      <main className="py-10">
        <article>
          <Timer count={parseInt(quizState.time)} />
          <p>
            Question: {currQuestionCounter}/{quizState.amount}
          </p>
          <p>{quizSetUpData ? quizSetUpData[0].question : ""}</p>
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
            />
          )}
        </article>
      </main>
    </div>
  );
};

export default QuizPage;
