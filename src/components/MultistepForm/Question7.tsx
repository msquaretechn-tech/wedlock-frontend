import React from 'react';
import Select from 'react-select';

// Define the type for options used in the Select component
type Option = {
  value: string ;
  label: string ;
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

    // Update the value based on which select was changed
    let updatedValue;
    if (isFirst) {
      updatedValue = `${selectedOption?.value || ""}-${secondAge || ""}`;
    } else {
      updatedValue = `${firstAge || ""}-${selectedOption?.value || ""}`;
    }

    // Call the change handler with the updated value
    handleOptionChange(question[0].id, updatedValue.trim());
  };

  // Get the current selected option for this question
  const currentOption = selectedOptions.find(
    (opt) => opt.questionId === question[0].id
  );
  const [selectedFirstAge, selectedSecondAge] = Array.isArray(currentOption?.answerValue)
  ? []
  : (currentOption?.answerValue || "").split("-");
  
  return (
    <div>
      {question.map((ques) => (
        <div className="text-left md:text-center" key={ques.id}>
          <h2 className="w-full text-2xl font-bold md:text-3xl mb-4">
            {ques.text}
          </h2>
          <p className="text-[#FFFFFF90]">{ques.summary}</p>

          <div className="md:w-auto py-4 flex items-center justify-center space-x-4">
            <Select
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

            <Select
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
        </div>
      ))}
    </div>
  );
};

export default Question7;
