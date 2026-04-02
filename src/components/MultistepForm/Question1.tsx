import React from "react";

const questions = [
  {
    id: 1,
    text: "I am a",
    options: ["Man", "Woman", "Non-binary"],
  },
  {
    id: 2,
    text: "I am looking for a",
    options: ["Man", "Woman", "Non-binary"],
  },
];



type QuestionProps = {
  selectedOptions: { questionId: number; answerValue: string | string[] }[];
  handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};


const Question1: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
  return (
    <div className="flex flex-col gap-6 py-4">
      {questions.map((question) => (
        <div key={question.id}>
          <p className="font-Proxima-Nova-SemiBold text-white w-full  text-2xl   md:text-3xl mb-4">{question.text}</p>
          <div className="flex flex-wrap gap-4 py-2">
            {question.options.map((option, index) => {
              const isSelected = selectedOptions.some(
                (sel) => sel.questionId === question.id && sel.answerValue === option
              );

              return (
                <label
                  key={index}
                  htmlFor={`option-${question.id}-${index}`}
                  className={`flex items-center justify-between w-full md:w-[150px] rounded-xl text-sm h-10 cursor-pointer px-6 transition-all  ${
                    isSelected ? "bg-white text-[#007EAF]" : "bg-[#FFFFFF80] text-white"
                  }`}
                >
                  {option}
                  <input
                    id={`option-${question.id}-${index}`}
                    type="checkbox"
                    className="ml-2 w-4 h-4"
                    checked={isSelected}
                    onChange={() => handleOptionChange(question.id, option)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Question1;
