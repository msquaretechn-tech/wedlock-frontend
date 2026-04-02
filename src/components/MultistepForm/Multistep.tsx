import { useState, useEffect } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Welcome from "./Welcome";

import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question8 from "./Question8";
import Question9 from "./Question9";
import Question10 from "./Question10";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question11 from "./Question11";

const Multistep = () => {
  const [isExclusive, setExclusive] = useState(false);
  const [isWelcome, setWelcome] = useState(true);

  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<
    { questionId: number; answerValue: string | string[] }[]
  >([]);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true);
    }
  });

  console.log(selectedOptions, "selected");

  const [page, setPage] = useState(0);

  const PageTitles = [
    "Question 1/11",
    "Question 2/11",
    "Question 3/11",
    "Question 4/11",
    "Question 5/11",
    "Question 6/11",
    "Question 7/11",
    "Question 8/11",
    "Question 9/11",
    "Question 10/11",
    "Question 11/11",
  ];

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return (
          <Question1
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 1:
        return (
          <Question2
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 2:
        return (
          <Question3
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 3:
        return (
          <Question4
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 4:
        return (
          <Question5
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 5:
        return (
          <Question6
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 6:
        return (
          <Question7
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 7:
        return (
          <Question8
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 8:
        return (
          <Question9
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 9:
        return (
          <Question10
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );
      case 10:
        return (
          <Question11
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
        );

      default:
        return null;
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleOptionChange = (
    questionId: number,
    answerValue: string | string[]
  ) => {
    setSelectedOptions((prev) => {
      const updatedOptions = prev.filter(
        (option) => option.questionId !== questionId
      );
      return [...updatedOptions, { questionId, answerValue }];
    });
  };

  const handleNext = () => {
    if (page === 0) {
      const has1AnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 1
      );

      if (!has1AnsweredAll) {
        toast.error("Please answer the question before proceeding!");
        return;
      }

      const has2AnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 2
      );
      if (!has2AnsweredAll) {
        toast.error("Please answer the question before proceeding!");
        return;
      }
    }

    if (page === 1) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 3
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page === 2) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 4
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page === 3) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 5
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }
    if (page === 4) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 6
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }
    if (page === 5) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 7
      );
      if (!hasAnsweredAll) {
        toast.error("Please answer the question before proceeding!");
        return;
      }
    }

    if (page === 6) {
      // Validation for Question 8
      const answerValue = selectedOptions.find(
        (sel) => sel.questionId === 8
      )?.answerValue;

      if (!answerValue) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }

      const [minAge, maxAge] = (
        typeof answerValue === "string" ? answerValue : ""
      )
        .split("-")
        .map(Number);

      if (!minAge || !maxAge || isNaN(minAge) || isNaN(maxAge)) {
        toast.error("Invalid age range. Please select valid ages!");
        return;
      }

      if (minAge >= maxAge) {
        toast.error("Minimum age should be less than maximum age!");
        return;
      }
    }

    if (page === 7) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 9
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page === 8) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 10
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page === 9) {
      const hasAnsweredAll = selectedOptions.some(
        (sel) => sel.questionId === 11
      );
      if (!hasAnsweredAll) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page === 10) {
      const selectedAnswer = selectedOptions.find(
        (sel) => sel.questionId === 12
      )?.answerValue;

      if (!selectedAnswer || selectedAnswer.length === 0) {
        toast.error(
          "Please answer the question before proceeding!"
        );
        return;
      }
    }

    if (page < PageTitles.length - 1) {
      setPage(page + 1);
    } else if (page === PageTitles.length - 1) {
      Cookies.set("answers", JSON.stringify(selectedOptions));
      navigate("/register");
    }
  };

  const handleWelcomeContinue = () => {
    setWelcome(false);
    setPage(0);
  };

  return (
    <div
      className={`min-w-screen relative flex min-h-screen flex-col items-center ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      } px-2 text-white md:px-28 lg:px-60 3xl:px-60`}
    >
      <div className="relative mt-5 w-full md:mt-10 h-[80px]">
        {/* Logo centered relative to the screensaf */}
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <Link to="/">
            <img
              src="/logowhite.png"
              alt="Wedlock Logo"
              className="md:w-62 md:h-24 h-20 w-50"
            />
          </Link>
        </div>
      </div>

      {isWelcome ? (
        <Welcome handleNext={handleWelcomeContinue} />
      ) : (
        <div>
          <div className=" mt-20 w-full text-center ">
            <h2
              className="text-2xl"
              style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
            >
              {PageTitles[page]}
            </h2>
            <div className="mb-6 mt-1 h-2.5 rounded-full bg-[#E0ECFF]">
              <div
                className="h-2.5 rounded-full bg-[#31F7C8]"
                style={{
                  width: `${((page + 1) / PageTitles.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="form-container w-full md:w-auto">
            <div className="form-body  ">{PageDisplay()}</div>

            <div className="form-footer">
            <div className="max-md:bottom-5 2xl:bottom-10 flex w-full items-center justify-end md:absolute md:right-20 lg:right-40 xl:mt-6 3xl:right-60 px-4">
  <div className="flex w-full flex-row items-center justify-between gap-3 md:justify-end md:gap-10">
    <button
      type="button"
      className={`flex h-[48px] w-[48%] md:w-[160px] items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-medium ${
        isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
      }`}
      onClick={page > 0 ? handlePrevious : () => navigate("/")}
    >
      <FaArrowLeftLong /> Back
    </button>

    <button
      type="button"
      className={`flex h-[48px] w-[48%] md:w-[160px] items-center justify-center gap-2 rounded-md bg-white px-4 py-2 font-medium ${
        isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
      }`}
      onClick={handleNext}
    >
      Continue <FaArrowRightLong />
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Multistep;
