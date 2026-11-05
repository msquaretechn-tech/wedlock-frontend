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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#007EAF]">Manage photos</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800" aria-label="Close">
            &times;
          </button>
        </div>
        <p className="mb-5 text-sm text-gray-500">
          Up to 3 photos. The first photo is your main profile photo. Use the arrows to change the order.
        </p>

        <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={onFile} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {slots.map((slot, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={slot.kind === "existing" ? slot.url : slot.preview}
                  alt={`photo ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#007EAF] px-2 py-0.5 text-xs font-semibold text-white">
                    Main
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between gap-1 text-sm">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Move left"
                >
                  ←
                </button>
                <button type="button" onClick={() => pickFile(i)} className="rounded px-2 py-1 text-[#007EAF] hover:bg-gray-100">
                  Replace
                </button>
                <button type="button" onClick={() => remove(i)} className="rounded px-2 py-1 text-red-600 hover:bg-red-50">
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === slots.length - 1}
                  className="rounded px-2 py-1 hover:bg-gray-100 disabled:opacity-30"
                  aria-label="Move right"
                >
                  →
                </button>
              </div>
            </div>
          ))}

          {slots.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => pickFile(null)}
              className="flex aspect-[4/5] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#007EAF] hover:text-[#007EAF]"
            >
              + Add photo
            </button>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-lg bg-gray-200 px-5 py-2 font-semibold text-gray-700">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={isLoading}
            className="rounded-lg bg-[#007EAF] px-6 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isLoading ? <LoadingOutlined className="animate-spin" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePhotosModal;
