import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import QuizPage from "./Views/QuizPage";
import NoPageFound from "./Views/NoPage";
import { quizType } from "./interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const [quizState, setQuizState] = useState<quizType>({
    username: "RandomUser",
    category: "History",
    amount: "10",
    time: "15",
    difficulty: "None",
  });
  let navigate = useNavigate();
  const getQuizState = (newState: quizType) => {
    setQuizState(newState);
    navigate(`quiz`);
  };
  function handleReturnHomePage() {
    navigate(`/`);
  }
  return (
    <Routes>
      <Route path="/" element={<HomePage getQuizState={getQuizState} />} />
      <Route
        path="quiz"
        element={
          <QuizPage
            quizState={quizState}
            handleReturnHomePage={handleReturnHomePage}
          />
        }
      />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
}

export default App;
