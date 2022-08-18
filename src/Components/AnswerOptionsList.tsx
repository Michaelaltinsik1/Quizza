import AnswerOption from "./AnswerOption";
interface AnswerProps {
  AnswerOptions: Array<string>;
  correctAnswer: string;
}

const AnswerOptionsList = ({ AnswerOptions, correctAnswer }: AnswerProps) => {
  console.log(AnswerOptions);
  const shuffleArray = (array: Array<string>) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };
  shuffleArray(AnswerOptions);

  return (
    <div className="grid grid-cols-2">
      {AnswerOptions.map((item: string) => (
        <AnswerOption correctAnswer={correctAnswer}>{item}</AnswerOption>
      ))}
    </div>
  );
};
export default AnswerOptionsList;
