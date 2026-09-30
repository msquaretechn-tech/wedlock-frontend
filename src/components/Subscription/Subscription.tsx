import React, { useEffect, useState } from "react";

const Subscription: React.FC = () => {
  const [prices, setPrices] = useState({
    monthlyPremium: "",
    monthlyExclusive: "",
    yearlyPremium: "",
    yearlyExclusive: "",
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("https://api.wedlock.com.au/api/v1/plan/getPlanFree");
        const data = await res.json();

        if (data.success) {
          const monthlyPremium =
            data.data.Monthly.find((p: any) => p.planName === "Premium")?.price || "";
          const monthlyExclusive =
            data.data.Monthly.find((p: any) => p.planName === "Exclusive")?.price || "";
          const yearlyPremium =
            data.data.Yearly.find((p: any) => p.planName === "Premium")?.price || "";
          const yearlyExclusive =
            data.data.Yearly.find((p: any) => p.planName === "Exclusive")?.price || "";

          setPrices({
            monthlyPremium,
            monthlyExclusive,
            yearlyPremium,
            yearlyExclusive,
          });
        }
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="  p-6 mt-12 max-md:mx-0 mx-24 ">
      <h2 className="text-3xl font-semibold text-center mb-4  pt-10  ">
        Subscription Plan Comparison
      </h2>

      <hr className="my-4" />

      <div>
        <div className="overflow-x-auto">
          <table className="w-full  border">
            <thead className="border-b-2 ">
              <tr className="border-b-2  max-md:text-md text-center  text-2xl">
                <th className="text-left p-2">
                  <div className="pt-5 pb-5 text-2xl text-[20px]">Features</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl text-[20px]">Standard</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl text-[20px]">Premium</div>
                </th>
                <th>
                  <div className="pt-5 pb-5 text-2xl text-[20px]">Exclusive</div>
                </th>
              </tr>
            </thead>

            <tbody className="text-center ">
              <tr className="border-b-2 ">
                <td className="font-normal text-xl max-md:text-md font-[Proxima-Nova-semiBold] text-left text-gray-500 ">
                  Membership Costs
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  1 Month (calendar month, no auto-renewal)
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  Free
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  A${prices.monthlyPremium}
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  A${prices.monthlyExclusive}
                </td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  12 Months (365 days, no auto-renewal)
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  Free
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  A${prices.yearlyPremium}
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">
                  A${prices.yearlyExclusive}
                </td>
              </tr>
             

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500 ">
                  Basic access
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Create favorites lists
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Create photo profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send friend requests
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  View profiles in full
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Access to Exclusive profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2 ">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Searching
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Appear first in searches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">Limited</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Save searches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Search/browse profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Use advanced searching
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Communication
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send interests to members
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Initiate in-app chat conversations
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Respond to in-app chat requests
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Initiate in-app video conversations
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Send unlimited messages
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Video conversation limit
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">15 mins per call for each profile</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">30 mins per call for each profile</td>
              </tr>


              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Profile Management
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Customize your profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  See who's viewed your profile
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Stand out from other profiles
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">X</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left  text-gray-500">
                  Matchmaking
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Receive suggested matches
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Take personality test
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Use matchmaking tools
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-xl max-md:text-md font-Proxima-Nova-SemiBold text-left text-gray-500">
                  Security
                </td>
              </tr>

              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Email verification at sign-up
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>

              </tr>
              <tr className="border-b-2">
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-left ">
                  Password and OTP authentication
                </td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
                <td className="font-normal text-md max-md:text-md font-Proxima-Nova-Light text-center ">✔</td>
              </tr>

            </tbody>
          </table>

          <div>
            <p className="text-[10px]  font-Proxima-Nova-Light sm:text-[10px] md:text-[20px] lg:text-[14px] xl:text-[18px] pt-[21px]  md:text-start mr-1 mb-9">
            <i style={{fontSize:"18px"}}>All prices are in Australian dollars and include GST. There are no additional fees, and no plan renews automatically.</i><br></br>
            <br></br>
            
            <b style={{fontSize:"20px"}}>Ending or renewing a plan</b><br></br>
            Wedlock plans do not renew automatically. Your plan ends by itself on the last day of the term you paid for, and nothing further is charged.<br></br>
You can see your end date, and buy a new term if you want one, under Manage plan in your account settings. We email you 7 days and 1 day before your term ends.<br></br>
When the term ends your access returns to the free Standard plan. Your profile, your matches and your conversations stay exactly as they are.<br></br>
If you bought your plan through Google Play, you can also manage it in your Google Play account.

          </p>
          </div>

        </div>


      </div>
    </div>
  );
};

export default Subscription;
