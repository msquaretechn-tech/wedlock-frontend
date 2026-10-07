import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Welcome = ({ handleNext }: { handleNext: () => void }) => {
  const [isExclusive, setExclusive] = useState(false);
  const [step, setStep] = useState<"welcome" | "consent">("welcome");

  // Age gate state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [ageError, setAgeError] = useState("");

  // Consent checkboxes
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [sensitiveConsent, setSensitiveConsent] = useState(false);

  useEffect(() => {
    const exclusive = localStorage.getItem("isExclusive");
    if (exclusive) {
      setExclusive(true);
    }
  }, []);

  // Validate age when inputs change
  useEffect(() => {
    if (day && month && year && year.length === 4) {
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);

      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
        setAgeError("Please enter a valid date of birth.");
        return;
      }

      const birthDate = new Date(y, m - 1, d);
      if (birthDate.getFullYear() !== y || birthDate.getMonth() !== m - 1 || birthDate.getDate() !== d) {
        setAgeError("Please enter a valid date of birth.");
        return;
      }

      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      if (calculatedAge < 18) {
        setAgeError("Sorry — Wedlock is only for people aged 18 and over, so we cannot create an account for you.");
      } else {
        setAgeError("");
      }
    } else {
      setAgeError("");
    }
  }, [day, month, year]);

  const isAgeValid = Boolean(
    day &&
    month &&
    year &&
    year.length === 4 &&
    !ageError
  );

  const canContinue = isAgeValid && termsAgreed && sensitiveConsent;

  const handleConsentContinue = () => {
    if (!canContinue) return;

    // Save consent in localStorage for audit trail
    localStorage.setItem(
      "userConsent",
      JSON.stringify({
        ageGatePassed: true,
        dob: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
        consentTermsAndAge: true,
        consentSensitiveInfo: true,
        dateAndTimeShown: new Date().toISOString(),
        noticeVersion: "v1.0",
      })
    );

    handleNext();
  };

  return (
    <div
      className={`min-w-screen relative flex-col ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      } px-2 text-white md:px-28 lg:px-40 3xl:px-60`}
    >
      {step === "welcome" ? (
        /* Step 1: Original Congratulations Welcome Screen */
        <div className="flex mt-40 flex-col items-center justify-center text-center gap-5">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome to Wedlock</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center">
            Congratulations! You are now one step closer to find your preferred partner.
          </p>

          <button
            type="button"
            className={`flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-white md:px-40 py-2 font-medium ${
              isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
            } md:w-auto xl:mt-5 md:mt-0 shadow-sm hover:bg-gray-100 transition`}
            onClick={() => setStep("consent")}
          >
            Click to continue
          </button>
        </div>
      ) : (
        /* Step 2: Collection Notice & Age Gate Screen */
        <div className="flex mt-10 md:mt-16 flex-col items-center justify-center max-w-2xl mx-auto pb-10">
          <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 md:p-8 space-y-5 text-white shadow-lg">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">What we collect and why</h2>
              <div className="text-xs md:text-sm text-white/90 space-y-3 leading-relaxed">
                <p>
                  Wedlock Global Services (Australia) Pty Ltd (ABN 36 679 422 738) collects the information you give us here so we can create your profile and suggest matches. We cannot provide the service without it.
                </p>
                <p>
                  Some of the questions ask about your religion, community, ethnicity, nationality and the gender of the people you would like to meet. Australian privacy law treats this as sensitive information, so we only collect it with your consent, and you can skip any question marked optional.
                </p>
                <p>
                  We share your information with the service providers who host our platform, send our messages and process our payments. We do not sell your information to anyone.
                </p>
                <p>
                  Our{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-cyan-200"
                  >
                    Privacy Policy
                  </Link>{" "}
                  explains how to see the information we hold about you, correct it, delete it, or make a complaint.
                </p>
              </div>
            </div>

            {/* Age Gate */}
            <div className="pt-2 border-t border-white/20">
              <label className="block text-xs md:text-sm font-semibold mb-2">
                Date of Birth (must be 18 or over):
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value.replace(/\D/g, ""))}
                  className="w-16 h-10 text-center rounded-lg bg-white text-gray-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <span className="text-white font-bold">/</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))}
                  className="w-16 h-10 text-center rounded-lg bg-white text-gray-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
                <span className="text-white font-bold">/</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                  className="w-24 h-10 text-center rounded-lg bg-white text-gray-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              {ageError && (
                <p className="mt-2 text-xs md:text-sm bg-red-500/20 border border-red-300 text-red-100 p-2 rounded-md">
                  {ageError}
                </p>
              )}
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-3 pt-2 border-t border-white/20">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="termsAndAge"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded cursor-pointer accent-[#007EAF]"
                />
                <label htmlFor="termsAndAge" className="text-xs md:text-sm cursor-pointer select-none">
                  I am 18 or over, and I agree to the{" "}
                  <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-cyan-200">
                    Terms and Conditions
                  </Link>{" "}
                  and the{" "}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-cyan-200">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="sensitiveConsent"
                  checked={sensitiveConsent}
                  onChange={(e) => setSensitiveConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded cursor-pointer accent-[#007EAF]"
                />
                <label htmlFor="sensitiveConsent" className="text-xs md:text-sm cursor-pointer select-none">
                  I consent to Wedlock collecting the sensitive information described above so it can suggest matches for me.
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setStep("welcome")}
                className="px-5 py-2 rounded-md bg-white/20 text-white font-medium text-sm hover:bg-white/30 transition"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!canContinue}
                onClick={handleConsentContinue}
                className={`px-8 py-2.5 rounded-md font-semibold text-sm transition ${
                  canContinue
                    ? "bg-white text-[#007EAF] hover:bg-gray-100 shadow-md cursor-pointer"
                    : "bg-white/40 text-white/70 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
