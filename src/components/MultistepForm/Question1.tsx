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
        <fieldset key={question.id} className="border-none p-0 m-0">
          <legend className="font-Proxima-Nova-SemiBold text-white w-full text-2xl md:text-3xl mb-4">
            {question.text}
          </legend>
          <div className="flex flex-wrap gap-4 py-2">
            {question.options.map((option, index) => {
              const inputId = `question-${question.id}-option-${index}`;
              const isSelected = selectedOptions.some(
                (sel) => sel.questionId === question.id && sel.answerValue === option
              );

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between w-full md:w-[150px] rounded-xl text-sm h-10 px-6 transition-all ${
                    isSelected ? "bg-white text-[#007EAF]" : "bg-[#FFFFFF80] text-white"
                  }`}
                >
                  <label htmlFor={inputId} className="cursor-pointer select-none w-full flex items-center justify-between">
                    <span>{option}</span>
                    <input
                      id={inputId}
                      name={`question-${question.id}`}
                      type="checkbox"
                      className="ml-2 w-4 h-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default Question1;
