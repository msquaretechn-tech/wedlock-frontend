import Hero from "../../components/Legal/Hero";
import Nav from "../../components/Legal/Nav";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
  const currentDate = new Date().toDateString();
  const HeroData = {
    updatedAt: `Current as of ${currentDate.toLocaleString()}`,
    title: "Delete Account Policy",
    description:
      "Your trust, privacy, and data are important to us. This page outlines how you can delete your account and what happens to your data after deletion.",
  };

  return (
    <div className="flex flex-col">
      <Hero {...HeroData} />
      <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-16">
        <div>
          <Nav activeSectionData={"DELETE ACCOUNT POLICY"} />
        </div>
        <div>
          <p className="pb-4">
            At Wedlock, we believe you have the right to access, modify, and delete your personal data at any time. This policy outlines the steps and implications involved in deleting your account from our platform.
          </p>

          <h3 className="text-md font-bold pb-2">1. How to Delete Your Account</h3>
          <p className="pb-4">
            You can delete your Wedlock account at any time by going to the App:
            <br />
            <strong>Profile Tab {'>'} Delete Account</strong>
            <br />
            Follow the on-screen instructions to permanently delete your account.
          </p>

          <h3 className="text-md font-bold pb-2">2. What Happens When You Delete Your Account?</h3>
          <ul className="list-disc pl-4 pb-4">
            <li>Your profile will be permanently removed from the platform.</li>
            <li>You will no longer appear in search results or recommendations.</li>
            <li>Your matches, messages, and personal data will be erased from our active systems.</li>
            <li>Certain data (like payment history) may be retained as required by law or for security, fraud prevention, or audit purposes.</li>
          </ul>

          <h3 className="text-md font-bold pb-2">3. Can I Restore My Account After Deletion?</h3>
          <p className="pb-4">
            No. Once your account is deleted, it cannot be recovered. You would need to create a new account if you wish to use our services again.
          </p>

          <h3 className="text-md font-bold pb-2">4. Data Retention After Deletion</h3>
          <p className="pb-4">
            We may retain minimal data necessary for legal compliance, fraud detection, and security purposes. All other personal information is deleted or anonymized within 30 days.
          </p>

          <h3 className="text-md font-bold pb-2">5. Contact Us</h3>
          <p className="pb-4">
            If you need help deleting your account or have any questions regarding your data privacy, you can contact our support team at{" "}
            <Link to="mailto:support@wedlock.au" className="underline text-blue-600">
            info@wedlock.au
            </Link>
          </p>

          <p className="text-sm text-gray-600">
            Please review our <Link to="/privacy-policy" className="underline">Privacy Policy</Link> for more details on how your data is handled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
