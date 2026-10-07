import React from 'react';
import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

type SelectedOption = {
  questionId: number;
  answerValue: string | string[];  
};

const question = [
  {
    id: 8,
    text: "I am looking for a partner of age",
    summary:
      "Specifying the age range of your ideal partner helps us connect you with individuals who match your preferences.",
    options: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
    text2: "to",
    options1: Array.from({ length: 85 - 18 + 1 }, (_, i) => String(i + 18)),
  },
];

type QuestionProps = {
  selectedOptions: SelectedOption[];
  handleOptionChange: (questionId: number, answerValue: string) => void;
};

const Question7: React.FC<QuestionProps> = ({
  selectedOptions,
  handleOptionChange,
}) => {
  const ageOptions = question[0].options.map((option) => ({
    value: option,
    label: option,
  }));

  const ageOptions1 = question[0].options1.map((option) => ({
    value: option,
    label: option,
  }));

  const handleAgeChange = (selectedOption: Option | null, isFirst: boolean) => {
    const currentOption = selectedOptions.find(
      (opt) => opt.questionId === question[0].id
    );

    const currentValue = currentOption?.answerValue || "";
    const [firstAge, secondAge] = (currentValue as string).split("-");

    let updatedValue;
    if (isFirst) {
      updatedValue = `${selectedOption?.value || ""}-${secondAge || ""}`;
    } else {
      updatedValue = `${firstAge || ""}-${selectedOption?.value || ""}`;
    }

    handleOptionChange(question[0].id, updatedValue.trim());
  };

  const currentOption = selectedOptions.find(
    (opt) => opt.questionId === question[0].id
  );
  const [selectedFirstAge, selectedSecondAge] = Array.isArray(currentOption?.answerValue)
    ? []
    : (currentOption?.answerValue || "").split("-");

  return (
    <div>
      {question.map((ques) => (
        <fieldset key={ques.id} className="text-left md:text-center border-none p-0 m-0">
          <legend className="w-full text-2xl font-bold md:text-3xl mb-4 text-white">
            {ques.text}
          </legend>
          <p className="text-[#FFFFFF90] mb-2">{ques.summary}</p>

          <div className="md:w-auto py-4 flex items-center justify-center space-x-4">
            <label htmlFor={`question-${ques.id}-from-select`} className="sr-only">
              Minimum partner age
            </label>
            <Select
              id={`question-${ques.id}-from-select`}
              inputId={`question-${ques.id}-from-select-input`}
              options={ageOptions}
              className="text-black w-full"
              placeholder="Select age"
              value={ageOptions.find(
                (option) => option.value === selectedFirstAge?.trim()
              )}
              onChange={(selectedOption) =>
                handleAgeChange(selectedOption, true)
              }
            />

            <span>{ques.text2}</span>

            <label htmlFor={`question-${ques.id}-to-select`} className="sr-only">
              Maximum partner age
            </label>
            <Select
              id={`question-${ques.id}-to-select`}
              inputId={`question-${ques.id}-to-select-input`}
              options={ageOptions1}
              className="text-black w-full"
              placeholder="Select age"
              value={ageOptions1.find(
                (option) => option.value === selectedSecondAge?.trim()
              )}
              onChange={(selectedOption) =>
                handleAgeChange(selectedOption, false)
              }
            />
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default Question7;
