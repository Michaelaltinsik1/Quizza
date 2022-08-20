import { useState } from "react";
import DropDown from "../Components/DropdownItem";
import { quizType } from "../interfaces";
interface homePageProps {
  getQuizState: Function;
}

const HomePage = ({ getQuizState }: homePageProps) => {
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [quizState, setQuizState] = useState<quizType>({
    username: "",
    category: "History",
    amount: "10",
    time: "15",
    difficulty: "None",
  });
  const categories = [
    "History",
    "Music",
    "Science",
    "Geography",
    "General knowledge",
    "Food & Drink",
    "Film & TV",
    "Art & Literature",
    "Sport & Leisure",
    "Society & Culture",
  ];
  const questionCounts = ["10", "15", "20", "25", "30"];
  const questionCounters = ["15", "30", "45", "60"];
  const difficulties = ["None", "Easy", "Medium", "Hard"];

  function handleChange(value: string, key: string) {
    let quizObject: quizType = { ...quizState };
    quizObject[key as keyof typeof quizState] = value;
    setQuizState(quizObject);
  }

  function validateForm() {
    if (
      categories.includes(quizState.category) &&
      questionCounts.includes(quizState.amount) &&
      questionCounters.includes(quizState.time) &&
      difficulties.includes(quizState.difficulty)
    ) {
      if (quizState.username.length < 3) {
        setIsUsernameValid(false);
      } else {
        setIsUsernameValid(true);
        getQuizState(quizState);
      }
    }
  }
  return (
    <div>
      <header>
        <h1 className="text-center p-7 text-3xl text font-bold">Quizza</h1>
      </header>
      <form className="p-4 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <label className="flex items-center w-screen p-2" htmlFor="username">
          Username:
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value, "username")}
          />
        </label>
        {!isUsernameValid && <p className="text-red-700">Invalid username</p>}
        <DropDown
          category={"Categories"}
          options={categories}
          handleChange={handleChange}
        />
        <DropDown
          category={"Question Amount"}
          options={questionCounts}
          handleChange={handleChange}
        />
        <DropDown
          category={"Question Timer"}
          options={questionCounters}
          handleChange={handleChange}
        />
        <DropDown
          category={"Difficulty"}
          options={difficulties}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="py-2 px-6 border border-black rounded-xl m-4"
          onClick={validateForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
