import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Exclusive = () => {
  const navigate = useNavigate();
  const [checkedStates, setCheckedStates] = useState([false, false, false, false, false, false]);

  const handleCheckboxChange = (index: any) => {
    const updatedStates = [...checkedStates];
    updatedStates[index] = !updatedStates[index];
    setCheckedStates(updatedStates);
  };

  const handleContinue = () => {
    console.log("clicked");
    localStorage.setItem("isExclusive", "true");
    navigate("/questions");
  };

  const isAllChecked = checkedStates.every((state) => state);

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-[#60457e] text-white">
      <img src="/logowhite.png" alt="Logo" className="w-42 h-20 top-8" />

      <div className="text-center mb-5 max-md:mt-10 mt-4">
        <h1 className="max-lg:text-3xl text-[55px] font-Proxima-Nova-Bold mb-4">
          Exclusive matchmaking
        </h1>
        <h2 className="text-[1.2rem] whitespace-nowrap mx-auto font-Proxima-Nova-Light">
          Eligibility Criteria for an Exclusive Profile on Wedlock
        </h2>
        <p className="text-base  mx-auto font-Proxima-Nova-Light text-left" style={{ lineHeight: "2rem" }}>
          To maintain the quality, integrity, and exclusivity of our membership community,
        </p>  
        <p className="text-base  mx-auto font-Proxima-Nova-Light text-left" style={{ lineHeight: "2rem" }}>
          applicants for an Exclusive Profile should generally meet the following criteria:
        </p> 
      </div>

      <div className="w-[90%] max-md:w-[90%] max-w-2xl bg-white bg-opacity-10 rounded-lg max-md:p-4 p-8 container">
        <ul className="text-white space-y-6">
          {[
            "Minimum age of 18 years for females and 21 years for males.",
            "Minimum annual income of $100,000+.",
            "Graduate degree or higher qualification.",
            "Demonstrated professional achievements or an established career in a reputable industry.",
            "Background aligned with strong community and family values.",
            "No criminal background.",
            "Willingness to undergo comprehensive profile verification, including identity and occupation checks, where required."
          ].map((text, index) => (
            <li className="flex items-center space-x-4 " key={index}>
              <div className="flex-shrink-0" key={index}>

                <input
                  type="checkbox"
                  className="w-5 h-5 accent-pink-500 border-2 border-white rounded  focus:ring-pink-500"
                  checked={checkedStates[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
              <p className="font-Proxima-Nova-SemiBold">{text}</p>
            </li>
          ))}
        </ul>
      </div>
      <p>&nbsp;</p>
      <p className="text-base  mx-auto font-Proxima-Nova-Light">
        Eligibility criteria are considered holistically, and exceptional candidates may be assessed on a case-by-case basis.
      </p>

      <div className="flex space-x-4 mt-4 mb-4">
        <button
          className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded-md text-white ${isAllChecked ? "bg-[#553985]" : "bg-gray-400 cursor-not-allowed"
            }`}
          onClick={handleContinue}
          disabled={!isAllChecked}
        >
          Continue to proceed
        </button>
      </div>
    </div>
  );
};

export default Exclusive;
