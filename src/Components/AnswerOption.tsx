interface AnswerProps {
  children: React.ReactNode;
  correctAnswer: string;
  handleClick: Function;
  isClicked: boolean;
  isTimeout: React.MutableRefObject<boolean>;
  isReset: React.MutableRefObject<boolean>;
}

const AnswerOption = ({
  children,
  correctAnswer,
  handleClick,
  isClicked,
  isTimeout,
  isReset,
}: AnswerProps) => {
  return (
    <div
      onClick={() => handleClick(children)}
      className={`flex items-center justify-center text-center border-solid border-2 border-black rounded-md px-2 py-2 m-1 min-h-[4.5rem] font-mono font-black
          ${
            (correctAnswer === children && isClicked) ||
            (correctAnswer === children && isTimeout.current)
              ? `bg-green-400`
              : (correctAnswer !== children && isClicked) ||
                (correctAnswer !== children && isTimeout.current)
              ? `bg-red-400`
              : ""
          }`}
    >
      {children}
    </div>
  );
};
export default AnswerOption;
