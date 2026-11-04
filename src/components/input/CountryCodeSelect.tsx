import { useMemo, useState } from "react";
import { Country } from "country-state-city";

export const DEFAULT_COUNTRY_CODE = "+61";

// Shown at the top of the list, the rest follow alphabetically
const PINNED_ISO = ["AU", "NZ", "US", "GB", "IN"];

export const getCountryCodes = () => {
  const all = Country.getAllCountries()
    .map((c) => ({ iso: c.isoCode, name: c.name, flag: c.flag, code: `+${c.phonecode.replace(/\D/g, "")}` }))
    .filter((c) => c.code !== "+");
  const pinned = PINNED_ISO.map((iso) => all.find((c) => c.iso === iso)).filter(Boolean) as typeof all;
  return [...pinned, ...all.filter((c) => !PINNED_ISO.includes(c.iso))];
};

// "+61" + "0478 648 984" -> "+61478648984" (drops the local trunk 0)
export const toInternationalNumber = (countryCode: string, number: string) =>
  `${countryCode}${number.replace(/\D/g, "").replace(/^0+/, "")}`;

// "+61478648984" -> { countryCode: "+61", number: "478648984" }. Numbers saved before country codes existed stay as-is.
export const splitInternationalNumber = (value?: string | null) => {
  const stored = (value || "").toString().trim();
  if (!stored.startsWith("+")) return { countryCode: DEFAULT_COUNTRY_CODE, number: stored };
  const match = getCountryCodes()
    .map((c) => c.code)
    .sort((a, b) => b.length - a.length)
    .find((code) => stored.startsWith(code));
  return match
    ? { countryCode: match, number: stored.slice(match.length) }
    : { countryCode: DEFAULT_COUNTRY_CODE, number: stored.replace(/\D/g, "") };
};

interface Props {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

const CountryCodeSelect = ({ value, onChange, className }: Props) => {
  const countries = useMemo(getCountryCodes, []);
  // Several countries share a code (+1 US/Canada, +61 AU/Christmas Island), so the option is keyed by country
  const [iso, setIso] = useState(() => countries.find((c) => c.code === value)?.iso || "AU");
  const selectedIso = countries.find((c) => c.iso === iso)?.code === value
    ? iso
    : countries.find((c) => c.code === value)?.iso || iso;

  return (
    <select
      value={selectedIso}
      onChange={(e) => {
        const country = countries.find((c) => c.iso === e.target.value);
        if (!country) return;
        setIso(country.iso);
        onChange(country.code);
      }}
      className={className}
      aria-label="Country code"
    >
      {countries.map((c) => (
        <option key={c.iso} value={c.iso}>
          {c.flag} {c.code} ({c.iso})
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelect;
