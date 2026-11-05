import { useRef } from "react";
import { Link } from "react-router-dom";
import heroDesktop from "../../assets/hero-banner-desktop.jpg";
import heroMobile from "../../assets/hero-banner-mobile.jpg";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-[#009BDA] font-semibold text-white shadow-lg transition hover:bg-[#33b3e6] font-Proxima-Nova-SemiBold";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-full border-2 border-[#E6A93A] font-semibold text-[#E6A93A] transition hover:bg-[#E6A93A]/15 font-Proxima-Nova-SemiBold";

// The banner artwork already contains the headline, so it is shown uncropped (fixed aspect ratio)
// and only the buttons are placed on top; the text stays in the same place on every screen size.
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // "See how it works" scrolls to the section right after the banner
  const showHowItWorks = () =>
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#020B11]">
      {/* Same words as the artwork, for search engines and screen readers */}
      <div className="sr-only">
        <p>Australian Matrimonial Platform · Not a Dating App</p>
        <h1>Where the intention is marriage.</h1>
        <p>Family welcome · Free to join · No sales calls, ever</p>
      </div>

      <div className="relative">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="Bride and groom smiling at their wedding ceremony"
            className="block h-auto w-full"
          />
        </picture>

        {/* Desktop: under the tagline on the left. Positions/sizes are % of the 1920x1080 artwork (vw) so they scale with it */}
        <div className="absolute left-[6.25%] top-[78%] hidden items-center gap-[1.2vw] md:flex">
          <Link to="/questions" className={`${primaryBtn} h-[4.2vw] min-h-[40px] px-[2.8vw] text-[clamp(14px,1.45vw,28px)]`}>
            Get Started Free
          </Link>
          <button
            type="button"
            onClick={showHowItWorks}
            className={`${secondaryBtn} h-[4.2vw] min-h-[40px] px-[2.8vw] text-[clamp(14px,1.45vw,28px)]`}
          >
            See how it works
          </button>
        </div>
      </div>

      {/* Mobile: the artwork's text runs to its bottom edge, so the buttons sit just below it */}
      <div className="flex gap-2 px-[7.5%] pb-10 pt-2 md:hidden">
        <Link to="/questions" className={`${primaryBtn} h-11 flex-1 whitespace-nowrap px-3 text-[15px]`}>
          Get Started Free
        </Link>
        <button type="button" onClick={showHowItWorks} className={`${secondaryBtn} h-11 flex-1 whitespace-nowrap px-3 text-[15px]`}>
          See how it works
        </button>
      </div>
    </section>
  );
}

export default Hero;
