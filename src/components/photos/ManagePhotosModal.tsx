import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ref, update } from "firebase/database";
import { LoadingOutlined } from "@ant-design/icons";
import { useManagePhotosMutation } from "../../Redux/Api/form.api";
import { auth, database } from "../../../utils/firebaseConfig.ts";

const MAX_PHOTOS = 3;
const MAX_SIZE = 15 * 1024 * 1024;

// A slot is either a photo already on the profile (url) or a newly picked file
type Slot = { kind: "existing"; url: string } | { kind: "new"; file: File; preview: string };

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onSaved: () => void;
}

const ManagePhotosModal = ({ isOpen, onClose, images, onSaved }: Props) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [managePhotos, { isLoading }] = useManagePhotosMutation();

  // Preview URLs created while the modal is open; freed when it closes
  const previews = useRef<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSlots(images.filter(Boolean).map((url) => ({ kind: "existing", url })));
      return () => {
        previews.current.forEach((u) => URL.revokeObjectURL(u));
        previews.current = [];
      };
    }
    // Keyed on the URLs (not the array identity) so a parent re-render doesn't wipe unsaved edits
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.join("|")]);

  // While open: lock the page behind, and let the phone's Back button close the popup instead of leaving the page
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.history.pushState({ ...window.history.state, managePhotos: true }, "");
    const onPop = () => onCloseRef.current();
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = prevOverflow;
      // Closed with Cancel/Save/X: drop the history entry we added
      if (window.history.state?.managePhotos) window.history.back();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const pickFile = (index: number | null) => {
    setReplaceIndex(index);
    fileInput.current?.click();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_SIZE) {
      toast.error("Please choose a photo smaller than 15MB.");
      return;
    }
    const preview = URL.createObjectURL(file);
    previews.current.push(preview);
    const slot: Slot = { kind: "new", file, preview };
    setSlots((prev) =>
      replaceIndex === null ? [...prev, slot].slice(0, MAX_PHOTOS) : prev.map((s, i) => (i === replaceIndex ? slot : s))
    );
  };

  const remove = (index: number) => setSlots((prev) => prev.filter((_, i) => i !== index));

  const move = (index: number, dir: -1 | 1) =>
    setSlots((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const save = async () => {
    if (slots.length === 0) {
      toast.error("Please keep at least one photo on your profile.");
      return;
    }
    const formData = new FormData();
    let n = 0;
    const order = slots.map((s) => {
      if (s.kind === "existing") return s.url;
      formData.append("profileImage", s.file);
      return `new:${n++}`;
    });
    formData.append("order", JSON.stringify(order));

    try {
      const res: any = await managePhotos(formData).unwrap();
      const firstPhoto = res?.images?.[0];
      if (auth.currentUser?.uid && firstPhoto) {
        await update(ref(database, `users/${auth.currentUser.uid}`), { profilePic: firstPhoto });
      }
      toast.success(res?.message || "Photos updated");
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Could not update photos. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 sm:items-center sm:p-4"
      onClick={onClose}
    >
      {/* Header and buttons stay fixed; only the photo grid scrolls, so Save is always reachable on phones */}
      <div
        className="flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 px-4 pb-3 pt-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#007EAF]">Manage photos</h2>
            <button onClick={onClose} className="px-2 text-3xl leading-none text-gray-500 hover:text-gray-800" aria-label="Close">
              &times;
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Up to 3 photos. The first photo is your main profile photo. Use the arrows to change the order.
          </p>
        </div>

        <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onFile} />

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {slots.map((slot, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-1.5 sm:p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={slot.kind === "existing" ? slot.url : slot.preview}
                    alt={`photo ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded-full bg-[#007EAF] px-2 py-0.5 text-[10px] font-semibold text-white sm:text-xs">
                      Main
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="h-8 w-8 rounded-full bg-gray-100 text-base disabled:opacity-30"
                    aria-label="Move left"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === slots.length - 1}
                    className="h-8 w-8 rounded-full bg-gray-100 text-base disabled:opacity-30"
                    aria-label="Move right"
                  >
                    →
                  </button>
                </div>
                <div className="mt-1.5 grid grid-cols-1 gap-1 text-xs font-semibold sm:grid-cols-2 sm:text-sm">
                  <button type="button" onClick={() => pickFile(i)} className="rounded-md bg-[#007EAF]/10 py-1.5 text-[#007EAF]">
                    Replace
                  </button>
                  <button type="button" onClick={() => remove(i)} className="rounded-md bg-red-50 py-1.5 text-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {slots.length < MAX_PHOTOS && (
              <button
                type="button"
                onClick={() => pickFile(null)}
                className="flex aspect-[4/5] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-center text-sm text-gray-500 hover:border-[#007EAF] hover:text-[#007EAF]"
              >
                + Add photo
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-4 py-3 sm:px-6">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg bg-gray-200 px-5 py-2.5 font-semibold text-gray-700 sm:flex-none">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-[#007EAF] px-6 py-2.5 font-semibold text-white disabled:opacity-60 sm:flex-none"
          >
            {isLoading ? <LoadingOutlined className="animate-spin" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePhotosModal;
