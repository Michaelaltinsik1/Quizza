import { useState } from "react";
import DropDown from "../Components/DropdownItem";

interface quizType {
  username: string;
  category: string;
  amount: string;
  time: string;
  difficulty: string;
}
const HomePage = () => {
  const [quizState, setQuizState] = useState<quizType>({
    username: "",
    category: "History",
    amount: "10",
    time: "15",
    difficulty: "None",
  });
  function handleChange(value: string, key: string) {
    let quizObject: quizType = { ...quizState };
    quizObject[key as keyof typeof quizState] = value;
    setQuizState(quizObject);
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
        <DropDown
          category={"Categories"}
          options={[
            "History",
            "Music",
            "Science",
            "Geography",
            "General knowledge",
            "Food & Drinks",
            "Film & TV",
            "Art & Literature",
            "Sport & Leisure",
            "Society & Culture",
          ]}
          handleChange={handleChange}
        />
        <DropDown
          category={"Question Amount"}
          options={["10", "15", "20", "25", "30"]}
          handleChange={handleChange}
        />
        <DropDown
          category={"Question Timer"}
          options={["15", "30", "45", "60"]}
          handleChange={handleChange}
        />
        <DropDown
          category={"Difficulty"}
          options={["None", "Easy", "Medium", "Hard"]}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="py-2 px-6 border border-black rounded-xl"
        >
          Submit
        </button>
        <p>{quizState.username}</p>
      </form>
    </div>
  );
};

export default HomePage;
