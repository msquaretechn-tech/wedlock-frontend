import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Welcome = ({ handleNext }: { handleNext: () => void }) => {
  const [isExclusive, setExclusive] = useState(false);

  // Age gate state
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isUnderage, setIsUnderage] = useState<boolean | null>(null);

  // Consents state
  const [consent1, setConsent1] = useState(false); // Terms & Privacy & Age
  const [consent2, setConsent2] = useState(false); // Sensitive Info
  const [marketingConsent, setMarketingConsent] = useState(false); // Marketing (optional, unticked by default)

  useEffect(() => {
    const isExclusiveStored = localStorage.getItem("isExclusive");
    if (isExclusiveStored) {
      setExclusive(true);
    }
  }, []);

  // Age calculation
  useEffect(() => {
    if (day && month && year && year.length === 4) {
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);

      if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y > 1900 && y <= new Date().getFullYear()) {
        const dob = new Date(y, m - 1, d);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const mDiff = today.getMonth() - dob.getMonth();
        if (mDiff < 0 || (mDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }

        if (age < 18) {
          setIsUnderage(true);
        } else {
          setIsUnderage(false);
        }
        return;
      }
    }
    setIsUnderage(null);
  }, [day, month, year]);

  const canContinue = isUnderage === false && consent1 && consent2;

  const onContinueClick = () => {
    if (!canContinue) return;

    // Save consent status in localStorage for audit recording at registration
    const consentRecord = {
      noticeVersion: "v1.0",
      dateAndTimeShown: new Date().toISOString(),
      ageGatePassed: true,
      consentTermsAndAge: true,
      consentSensitiveInfo: true,
      marketingConsent: marketingConsent,
      dateOfBirth: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
    };
    localStorage.setItem("wedlock_consent_record", JSON.stringify(consentRecord));
    localStorage.setItem("wedlock_marketing_consent", marketingConsent ? "true" : "false");
    handleNext();
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto flex flex-col ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      } px-6 py-8 text-white rounded-2xl shadow-xl my-4 pt-4 md:pt-6`}
    >
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Before we start</h1>
        <p className="mt-2 text-base md:text-lg text-white/90">
          Wedlock is for adults looking for marriage. You need to be 18 or over to create a profile.
        </p>
      </div>

      {/* Part 1: Age Gate (Date of Birth Input) */}
      <div className="bg-white/10 p-5 rounded-xl backdrop-blur-md mb-6 border border-white/20">
        <label className="block text-sm md:text-base font-semibold mb-3">
          Date of birth
        </label>
        <div className="grid grid-cols-3 gap-3 max-w-sm">
          <div>
            <input
              id="dob-day"
              type="number"
              placeholder="DD"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full h-12 text-center rounded-lg bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <input
              id="dob-month"
              type="number"
              placeholder="MM"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-12 text-center rounded-lg bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <input
              id="dob-year"
              type="number"
              placeholder="YYYY"
              min="1920"
              max={new Date().getFullYear()}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-12 text-center rounded-lg bg-white text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>

        {/* Underage rejection warning */}
        {isUnderage === true && (
          <div className="mt-4 p-4 rounded-lg bg-red-600/90 text-white font-medium text-sm leading-relaxed border border-red-400 animate-fadeIn">
            Sorry - Wedlock is only for people aged 18 and over. Thanks for your interest, and we hope to see you in the future.
          </div>
        )}
      </div>

      {/* Part 2: Collection Notice */}
      <div className="bg-white/10 p-5 rounded-xl backdrop-blur-md mb-6 border border-white/20 text-sm md:text-base text-white/95 space-y-3 leading-relaxed">
        <h2 className="text-xl font-bold text-white mb-2">What we collect and why</h2>
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
          <Link to="/privacy-policy" target="_blank" className="underline font-semibold hover:text-cyan-200">
            Privacy Policy
          </Link>{" "}
          explains how to see the information we hold about you, correct it, delete it, or make a complaint.
        </p>
      </div>

      {/* Part 3: Consents (Required & Marketing) */}
      <div className="space-y-4 mb-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent1}
            onChange={(e) => setConsent1(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
          />
          <span className="text-sm md:text-base leading-snug">
            I am 18 or over, and I agree to the{" "}
            <Link to="/terms-conditions" target="_blank" className="underline font-semibold hover:text-cyan-200">
              Terms and Conditions
            </Link>{" "}
            and the{" "}
            <Link to="/privacy-policy" target="_blank" className="underline font-semibold hover:text-cyan-200">
              Privacy Policy
            </Link>.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent2}
            onChange={(e) => setConsent2(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
          />
          <span className="text-sm md:text-base leading-snug">
            I consent to Wedlock collecting the sensitive information described above so it can suggest matches for me.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
          />
          <span className="text-sm md:text-base leading-snug">
            Send me match suggestions, tips and occasional offers by email. I can unsubscribe at any time.
          </span>
        </label>
      </div>

      {/* Continue Button */}
      {isUnderage !== true && (
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinueClick}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
            canContinue
              ? "bg-white text-[#007EAF] hover:bg-gray-100 cursor-pointer opacity-100"
              : "bg-white/40 text-white/70 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Welcome;
