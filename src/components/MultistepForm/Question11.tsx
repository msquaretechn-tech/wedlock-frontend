import React, { useState, useEffect } from 'react';

const question = [
  {
    id: 12,
    text: "What are your interests and hobbies?",
    summary:
      "Tell us about the activities that you enjoy and are passionate about. Select all that apply",
    options: [
      "Sports",
      "Photography",
      "Dancing",
      "Theater",
      "Literature",
      "Art",
      "Music",
      "Cooking",
      "Cinema",
      "History",
      "Craft",
      "Pottery",
      "Carpentry",
      "Collecting",
      "None",
    ],
  },
];

interface Question11Props {
  selectedOptions: { questionId: number; answerValue: string | string[] }[];
  handleOptionChange: (questionId: number, option: string | string[]) => void;
}


const Question11: React.FC<Question11Props> = ({ selectedOptions, handleOptionChange }) => {
  const initialSelectedOptions = selectedOptions.find(option => option.questionId === question[0].id)?.answerValue || [];
  const [localSelectedOptions, setLocalSelectedOptions] = useState<string[]>(initialSelectedOptions as string[]);

  useEffect(() => {
    handleOptionChange(question[0].id, localSelectedOptions);
  }, [localSelectedOptions]);

  const handleOptionChangeLocal = (option: string) => {
    if (option === "None") {
      setLocalSelectedOptions(["None"]);
    } else {
      setLocalSelectedOptions((prevSelectedOptions) => {
        const newSelections = prevSelectedOptions.filter((selectedOption) => selectedOption !== "None");

        if (newSelections.includes(option)) {
          return newSelections.filter((selectedOption) => selectedOption !== option);
        } else {
          return [...newSelections, option];
        }
      });
    }
  };

  return (
    <div >
      {question.map((ques) => (
        <div key={ques.id}>
          <div className="text-left md:text-center">
            <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
              {ques.text}
            </h2>
            <p className="text-[#FFFFFF90]">{ques.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-1 md:grid-cols-5 py-4">
            {ques.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center justify-between rounded-xl text-sm h-10 cursor-pointer px-2 ${
                  localSelectedOptions.includes(option)
                    ? "bg-white text-[#007EAF] h-11"
                    : "bg-[#FFFFFF80] text-white"
                }`}
              >
                {option}
                <input
                  type="checkbox"
                  className="ml-1 w-4 h-4"
                  checked={localSelectedOptions.includes(option)}
                  onChange={() => handleOptionChangeLocal(option)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Question11;
