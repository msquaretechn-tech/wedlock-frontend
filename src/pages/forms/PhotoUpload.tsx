import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useProfileImageUploadMutation } from "../../Redux/Api/form.api";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../../utils/firebaseConfig.ts";
import { ref, update } from "firebase/database";
import { LoadingOutlined } from '@ant-design/icons';
import { FaTimes } from "react-icons/fa";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import "../../font.css";

const PhotoUpload = () => {
  const [isExclusive, setExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true);
    }
  }, []);

  const navigate = useNavigate();

  interface ImageObject {
    file: File;
    id: string;
    previewUrl: string;
  }

  const [uploadedImages, setUploadedImages] = useState<ImageObject[]>([]);
  const [uploadProfileImage, { isLoading }] = useProfileImageUploadMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const validImages = fileList.filter((file) => file.size <= 15 * 1024 * 1024); // 15MB

      if (validImages.length > 0) {
        const newImages = validImages.map((file) => ({
          file,
          id: `${file.name}-${new Date().getTime()}-${Math.random()}`,
          previewUrl: URL.createObjectURL(file),
        }));

        uploadedImages.forEach((imageObject) => URL.revokeObjectURL(imageObject.previewUrl));
        setUploadedImages((prevImages) =>
          [...prevImages, ...newImages].slice(0, 3)
        );
      } else {
        toast.error("Please upload images smaller than 15MB.");
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  type ApiResponse = {
    success: boolean;
    message: string;
    imageUploadData?: {
      image: string[];
      [key: string]: any; // allow other backend fields like id, userId etc.
    };
  };
  

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const handleSubmit = async () => {
    if (uploadedImages.length > 0) {
      try {
        const formData = new FormData();
        uploadedImages.forEach((image) =>
          formData.append("profileImage", image.file)
        );

        const response = await uploadProfileImage(formData);
        console.log("Response:", response);

        if (response.error) {
          const errorData = response.error as FetchBaseQueryErrorWithData;
          console.log("Error Data:", errorData);

          if (errorData?.data?.success === false) {
            toast.error(errorData?.data?.message);
            return;
          }
        } else {
          const successData = response.data as ApiResponse;
          const imageUrl = successData?.imageUploadData?.image?.[0];
        console.log("Extracted image URL:", imageUrl);

          if (auth.currentUser?.uid && imageUrl) {
            await update(ref(database, `users/${auth.currentUser.uid}`), {
              profilePic: imageUrl,
            });
          }
          

          

          toast.success(successData.message);
          navigate("/other-details");
        }
      } catch (error) {
        console.error("Caught Error:", error);
        toast.error("An error occurred during the upload.");
      }
    } else {
      toast.error("Please upload at least one image before proceeding.");
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      } px-5 md:px-20 lg:px-40 3xl:px-60`}
    >
      <img
        src="/logowhite.png"
        alt="Wedlock Logo"
        className="w-72 h-24 mx-auto mb-2"
      />

      <div className="mt-5 w-full flex-grow xl:mt-20 2xl:mt-10">
        <div className="mb-6 text-center text-white md:mb-20">
          <h1
            className="text-xl md:mb-2 md:text-3xl 2xl:text-5xl"
            style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
          >
            Upload Your Photo
          </h1>
          <p className="text-sm leading-6 xl:text-xl">
            Your photo must be a close up, half view or full view
          </p>

          <div className="mt-4 flex justify-center">
            {uploadedImages.length === 0 ? (
              <div className="flex space-x-4">{/* Placeholder */}</div>
            ) : (
              <div className="flex space-x-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.previewUrl}
                      alt="uploaded"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 bg-gray-600 rounded-full text-white hover:bg-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between px-4">
            <span className="text-sm text-[#F9F5FFE5] md:text-lg">
              Upload up to 3 photos (max size 15MB)
            </span>

            <label
              htmlFor="file-upload"
              className="relative mt-4 h-40 w-[18rem] cursor-pointer rounded-md border border-dashed bg-[#007EAF] px-4 py-2 md:w-[30rem] xl:w-[40rem]"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src="/FeaturedIcon.svg"
                  alt="upload"
                  className="mb-2 h-10 w-10 rounded-full"
                />
                <p className="text-[14px] leading-5 text-white">
                  Click to upload or drag and drop
                </p>
                <p className="text-[14px] leading-5 text-white">
                  PNG, JPG, GIF, BMP, TIFF (max size 15MB)
                </p>
              </div>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/gif, image/bmp, image/tiff"
                className="sr-only"
                onChange={handleImageUpload}
                multiple
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mb-5 flex w-full justify-end py-8 pb-4 xl:px-10 2xl:mb-4 2xl:px-0 3xl:mb-20 3xl:px-0">
        <button
          onClick={handleSubmit}
          className={`w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${
            isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
          } md:w-20 2xl:w-32`}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingOutlined
              className={`${
                isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
              } animate-spin`}
            />
          ) : (
            "Upload"
          )}
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;
