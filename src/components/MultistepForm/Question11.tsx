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

  // Marketing Consent state (default unticked)
  const [marketingConsent, setMarketingConsent] = useState<boolean>(() => {
    return localStorage.getItem("wedlock_marketing_consent") === "true";
  });

  useEffect(() => {
    handleOptionChange(question[0].id, localSelectedOptions);
  }, [localSelectedOptions]);

  const handleMarketingChange = (checked: boolean) => {
    setMarketingConsent(checked);
    localStorage.setItem("wedlock_marketing_consent", checked ? "true" : "false");
  };

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
    <div>
      {question.map((ques) => (
        <fieldset key={ques.id} className="border-none p-0 m-0">
          <div className="text-left md:text-center">
            <legend className="w-full text-2xl font-bold md:text-3xl mb-4 text-white">
              {ques.text}
            </legend>
            <p className="text-[#FFFFFF90] mb-2">{ques.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-5 py-4">
            {ques.options.map((option, index) => {
              const inputId = `question-${ques.id}-option-${index}`;
              const isChecked = localSelectedOptions.includes(option);

              return (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-xl text-sm h-10 px-3 transition-all ${
                    isChecked
                      ? "bg-white text-[#007EAF] h-11"
                      : "bg-[#FFFFFF80] text-white"
                  }`}
                >
                  <label htmlFor={inputId} className="cursor-pointer select-none w-full flex items-center justify-between">
                    <span>{option}</span>
                    <input
                      id={inputId}
                      name={`question-${ques.id}`}
                      type="checkbox"
                      className="ml-1 w-4 h-4 cursor-pointer"
                      checked={isChecked}
                      onChange={() => handleOptionChangeLocal(option)}
                    />
                  </label>
                </div>
              );
            })}
          </div>

          {/* Marketing Consent Box (Final step) */}
          <div className="mt-8 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <label htmlFor="marketing-consent-checkbox" className="flex items-start gap-3 cursor-pointer select-none">
              <input
                id="marketing-consent-checkbox"
                name="marketingConsent"
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => handleMarketingChange(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
              />
              <span className="text-sm md:text-base text-white/95 leading-snug">
                Send me match suggestions, tips and occasional offers by email. I can unsubscribe at any time.
              </span>
            </label>
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default Question11;
