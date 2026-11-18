import { Link } from "react-router-dom";
import heroDesktop from "../../assets/hero-banner-desktop.jpg";
import heroMobile from "../../assets/hero-banner-mobile.jpg";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-[#009BDA] font-semibold text-white shadow-md transition hover:bg-[#33b3e6] font-Proxima-Nova-SemiBold";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-full border border-[#E6A93A] font-semibold text-[#E6A93A] transition hover:bg-[#E6A93A]/15 font-Proxima-Nova-SemiBold";

// Same video as the homepage YouTube section
const HOW_IT_WORKS_URL = "https://www.youtube.com/watch?v=XG1Ka5P6qP8";

// The banner artwork already contains the headline, so it is shown uncropped (fixed aspect ratio)
// and only the buttons are placed on top; the text stays in the same place on every screen size.
function Hero() {
  return (
    <section className="relative w-full bg-[#020B11]">
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

        {/* Desktop: under the tagline on the left. Placement and sizing match reference sample */}
        <div className="absolute left-[6.25%] top-[74%] hidden items-center gap-3 lg:gap-4 md:flex">
          <Link
            to="/questions"
            className={`${primaryBtn} h-11 lg:h-12 px-6 lg:px-7 text-[15px] lg:text-[16px]`}
          >
            Get Started Free
          </Link>
          <a
            href={HOW_IT_WORKS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${secondaryBtn} h-11 lg:h-12 px-6 lg:px-7 text-[15px] lg:text-[16px]`}
          >
            <svg
              className="mr-2 h-2.5 w-2.5 lg:h-3 lg:w-3 shrink-0 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            See how it works
          </a>
        </div>

        {/* Desktop: photo disclaimer in the bottom-right corner of the artwork */}
        <p className="absolute bottom-[3%] right-[2.5%] hidden text-[clamp(12px,0.95vw,18px)] italic text-white/85 drop-shadow md:block">
          Photographs are illustrative
        </p>
      </div>

      {/* Mobile: the artwork's text runs to its bottom edge, so the buttons sit just below it */}
      <div className="flex gap-2.5 px-[7.5%] pb-3 pt-2 md:hidden">
        <Link
          to="/questions"
          className={`${primaryBtn} h-11 flex-1 whitespace-nowrap px-3 text-[14px]`}
        >
          Get Started Free
        </Link>
        <a
          href={HOW_IT_WORKS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${secondaryBtn} h-11 flex-1 whitespace-nowrap px-3 text-[14px]`}
        >
          <svg
            className="mr-1.5 h-2.5 w-2.5 shrink-0 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          See how it works
        </a>
      </div>
      {/* Mobile: same disclaimer, bottom-right under the buttons */}
      <p className="px-[7.5%] pb-6 text-right text-xs italic text-white/70 md:hidden">Photographs are illustrative</p>
    </section>
  );
}

export default Hero;
