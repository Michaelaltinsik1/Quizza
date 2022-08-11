import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Views/HomePage";
import QuizPage from "./Views/QuizPage";
import NoPageFound from "./Views/NoPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
}

export default App;
