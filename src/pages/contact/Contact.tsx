import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Country } from 'country-state-city';
import { toast } from 'sonner';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [selectedCountry, setSelectedCountry] = useState("AU");
  const [phoneCode, setPhoneCode] = useState("");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryIsoCode = e.target.value;
    console.log(phoneCode);
    
    setSelectedCountry(countryIsoCode);
    const countryData = Country.getAllCountries().find(c => c.isoCode === countryIsoCode);
    setPhoneCode(countryData ? `+${countryData.phonecode}` : "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const formData = new FormData(form.current);
    const contactPayload = {
      firstName: formData.get("first_name") as string,
      lastName: formData.get("last_name") as string,
      email: formData.get("email") as string,
      country: formData.get("country") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      message: formData.get("message") as string,
    };
    

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/contact/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactPayload)
      });

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Message sent successfully!");
      form.current.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-10 px-6 py-10 md:px-10 lg:flex-row lg:gap-20 lg:px-20 mt-10 2xl:mt-0">
        <div className="w-full lg:w-[50%]">
          <div className="mx-auto max-w-md">
            <h2 className="mb-4 text-3xl font-semibold text-[#101828]">We’re Here to Help</h2>
            <p className="mb-6 text-[#475467]">
              Whether you have questions about our platform or need assistance, contact our dedicated customer support team.
            </p>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-700">First name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    className="mt-1 w-full rounded-[0.5rem] border border-gray-300 p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    className="mt-1 w-full rounded-[0.5rem] border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-[0.5rem] border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <select
                  name="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  {Country.getAllCountries().map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="000-000-0000"
                  className="w-full rounded border border-gray-300 p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  placeholder="Your message..."
                  className="mt-1 w-full resize-none rounded-[0.5rem] border border-gray-300 p-2"
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="mb-4 flex items-center">
                <input type="checkbox" id="privacy" className="mr-2" required />
                <label htmlFor="privacy" className="text-gray-700">
                  You agree to our friendly{" "}
                  <Link to={"/privacy-policy"} className="text-blue-500 underline">
                    Privacy Policy
                  </Link>.
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded bg-[#007EAF] p-2 text-white hover:bg-blue-700"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-[50%]">
          <img src="/contact.png" alt="Contact us" className="mx-auto" />
        </div>
      </div>

      <div className="px-6 py-10 md:px-10 lg:px-20 text-left bg-[#e4e8ea7d]">
        <h3 className="text-md font-bold text-[#101828]">Contact Us</h3>
        <p className="mb-2 text-[#475467]">
          Got something you want to talk about? Contact us or email us and we promise to get back to you as soon as we can.
        </p>
        <h3 className="mt-6 text-md font-bold text-[#101828]">Help / Support</h3>
        <p className="text-[#475467] pb-4">For all things technical, App and website related.</p>
        <h3 className="text-md font-bold">Contact Us or reach us by:</h3>
        <p className="text-black pb-4">
          <span className="font-medium">Phone: </span>+61 (1300 9335625)
        </p>
        <p className="text-black pb-4">
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:info@wedlock.au" className="underline">info@wedlock.au</a>
        </p>
        <p className="text-black">
          <span className="font-medium">Address:</span> Victoria, Australia
        </p>
      </div>
    </div>
  );
};

export default Contact;
