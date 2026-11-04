import { useEffect, useState } from "react";
import {
  useContactNumberByUserIdQuery,
  useUpdateContactNumberMutation,
} from "../../Redux/Api/profile.api";
import { Pencil, X } from "lucide-react";
import { toast } from "sonner";
import CountryCodeSelect, {
  DEFAULT_COUNTRY_CODE,
  splitInternationalNumber,
  toInternationalNumber,
} from "../input/CountryCodeSelect";

interface Props {
  userId?: string;
}

const ContactNumberView = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  

  // GET
  const { data, isLoading, refetch } =
    useContactNumberByUserIdQuery(userId, { skip: !userId });

  // UPDATE
  const [updateContactNumber, { isLoading: isUpdating }] =
    useUpdateContactNumberMutation();

  useEffect(() => {
    if (data?.contactNumber) {
      const parts = splitInternationalNumber(data.contactNumber);
      setCountryCode(parts.countryCode);
      setContactNumber(parts.number);
    }
  }, [data]);

  const handleUpdate = async () => {
    if (contactNumber.length < 6 || contactNumber.length > 14) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      await updateContactNumber({
        userId,
        contactNumber: toInternationalNumber(countryCode, contactNumber),
      }).unwrap();

      toast.success("Contact number updated");
      refetch();
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {/* DISPLAY VIEW */}
      <div className="flex items-center gap-3">
        <span className="text-gray-800 font-medium">
          {data?.contactNumber || "N/A"}
        </span>

        <button
          onClick={() => setOpen(true)}
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-blue-400/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 relative">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-800 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-blue-500">
              Update Mobile Number
            </h2>

            <div className="flex gap-2 mb-4">
            <CountryCodeSelect
              value={countryCode}
              onChange={setCountryCode}
              className="w-32 shrink-0 border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <input
              type="tel"
              maxLength={14}
              value={contactNumber}
              onChange={(e) =>
                setContactNumber(e.target.value.replace(/\D/g, ""))
              }
              className="w-full min-w-0 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="Mobile number"
            />
            </div>

            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactNumberView;
