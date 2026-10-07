import React from "react";

const question = [
  {
    id: 4,
    text: "What are your wedding goals?",
    summary:
      "Describe your vision for marriage and what you seek in a life partner.",
    options: [
      "Serious to get married soon",
      "Should understand each other first",
      "Not sure, just browsing",
    ],
  },
];

type QuestionProps = {
  selectedOptions: { questionId: number; answerValue: string | string[] }[];
  handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question3: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
  return (
    <div>
      {question.map((ques) => (
        <fieldset key={ques.id} className="text-left md:text-center border-none p-0 m-0">
          <legend className="w-full text-2xl font-bold md:text-3xl mb-4 text-white">
            {ques.text}
          </legend>
          <p className="text-[#FFFFFF90] mb-2">{ques.summary}</p>

          <div className="grid grid-cols-1 gap-4 md:w-auto py-4">
            {ques.options.map((option, index) => {
              const inputId = `question-${ques.id}-option-${index}`;
              const isSelected = selectedOptions.some(
                (sel) => sel.questionId === ques.id && sel.answerValue === option
              );

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl text-sm h-10 px-6 ${
                    isSelected ? "bg-white text-[#007EAF] h-12" : "bg-[#FFFFFF80] text-white"
                  }`}
                >
                  <label htmlFor={inputId} className="cursor-pointer select-none w-full flex items-center justify-between">
                    <span>{option}</span>
                    <input
                      id={inputId}
                      name={`question-${ques.id}`}
                      type="checkbox"
                      className="ml-2 w-4 h-4 cursor-pointer"
                      checked={isSelected}
                      onChange={() => handleOptionChange(ques.id, option)}
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

export default Question3;
