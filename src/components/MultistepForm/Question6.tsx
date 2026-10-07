import React from 'react';
import Select from 'react-select';

const question = [
  {
    id: 7,
    text: "I am of age",
    summary:
      "Knowing your age allows us to create matches that are compatible and appropriate for your life stage.",
    options: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
  },
];

type SelectedOption = { questionId: number; answerValue: string | string[] };

type QuestionProps = {
  selectedOptions: SelectedOption[];
  handleOptionChange: (questionId: number, answerValue: string | string[]) => void;
};

const Question6: React.FC<QuestionProps> = ({ selectedOptions, handleOptionChange }) => {
  const ageOptions = question[0].options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectedOption = selectedOptions.find(
    (selected) => selected.questionId === question[0].id
  );

  return (
    <div>
      {question.map((ques) => (
        <fieldset key={ques.id} className="text-left md:text-center border-none p-0 m-0">
          <legend className="w-full text-2xl font-bold md:text-3xl mb-4 text-white">
            {ques.text}
          </legend>
          <p className="text-[#FFFFFF90] mb-2">{ques.summary}</p>

          <div className="md:w-auto py-4">
            <label htmlFor={`question-${ques.id}-select`} className="sr-only">
              Select your age
            </label>
            <Select
              id={`question-${ques.id}-select`}
              inputId={`question-${ques.id}-select-input`}
              options={ageOptions}
              value={ageOptions.find(option => option.value === selectedOption?.answerValue)}
              onChange={(selected) =>
                handleOptionChange(ques.id, selected?.value || "")
              }
              className="w-full text-black"
              placeholder="Select your age"
            />
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default Question6;