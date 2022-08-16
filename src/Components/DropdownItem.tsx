import { useEffect } from "react";

interface DropDownProps {
  options: string[];
  category: string;
  handleChange: Function;
}

const DropDown = ({ options, category, handleChange }: DropDownProps) => {
  let categoryKey = "";
  switch (category) {
    case "Categories":
      categoryKey = "category";
      break;
    case "Question Amount":
      categoryKey = "amount";
      break;
    case "Question Timer":
      categoryKey = "time";
      break;
    case "Difficulty":
      categoryKey = "difficulty";
      break;
    default:
      console.log("none");
  }

  return (
    <div className="flex items-center max-w-full p-2 outline-rose-600">
      <label className="mx-2 w-2/5" htmlFor={category}>
        {category} :
      </label>
      <select
        className="mx-2 w-2/5"
        name={category}
        id={category}
        onChange={(e) => handleChange(e.target.value, categoryKey)}
      >
        {options.map((option) => (
          <option
            className="border-cyan-400 p-2 text-center py-auto"
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default DropDown;
