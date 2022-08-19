interface AnswerProps {
  children: React.ReactNode;
  correctAnswer: string;
  handleClick: Function;
  isClicked: boolean;
}

const AnswerOption = ({
  children,
  correctAnswer,
  handleClick,
  isClicked,
}: AnswerProps) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`flex items-center justify-center text-center border-solid border-2 border-black rounded-md px-2 py-2 m-1 min-h-[4.5rem] font-mono font-black
          ${
            correctAnswer === children && isClicked
              ? `bg-green-400`
              : correctAnswer !== children && isClicked
              ? `bg-red-400`
              : ""
          }`}
    >
      {children}
    </div>
  );
};
export default AnswerOption;
