import { useEffect, useState } from "react";

interface Props {
  images?: string[] | string;
  // Extra classes for every image (e.g. blur for photos the viewer's plan can't see)
  imageClassName?: string;
}

// Main photo with thumbnails underneath so all of a profile's photos (up to 3) can be viewed
const PhotoGallery = ({ images, imageClassName = "" }: Props) => {
  const list = (Array.isArray(images) ? images : []).filter(Boolean);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= list.length) setActive(0);
  }, [list.length, active]);

  if (list.length === 0) return null;

  return (
    <div className="w-full lg:w-[22rem] shrink-0">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={list[active]}
          alt={`profile photo ${active + 1}`}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {list.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded-md border-2 ${
                i === active ? "border-[#007EAF]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={url} alt={`thumbnail ${i + 1}`} className={`h-full w-full object-cover ${imageClassName}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
