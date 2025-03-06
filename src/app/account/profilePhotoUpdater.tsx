"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { User } from "@prisma/client";
import { prisma } from "@/lib/db";
import { updateProfileImage } from "@/serverActions";
import { useEdgeStore } from "@/lib/edgestore";

export default function ProfilePhotoUpdater({
  user,
  setUserImage,
}: {
  user: User;
  setUserImage: Dispatch<SetStateAction<string>>;
}): React.JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progressState, setProgressState] = useState(0);
  const [isProgressBar, setIsProgressBar] = useState(false);
  const { edgestore } = useEdgeStore();
  useEffect(() => {
    const file = selectedFile;
    if (file) {
      updateProfilePhoto();
    }
  }, [selectedFile]);

  const updateProfilePhoto = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
    try {
      setIsProgressBar(true);
      const res = await edgestore.publicImages.upload({
        file: selectedFile,
        onProgressChange: (progress) => {
          setProgressState(progress);
        },
      });
      updateProfileImage(res.url, user);
      setUserImage(res.url);
    } catch (error) {
      console.log("Upload error:", error);
    } finally {
      setIsProgressBar(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-2">
      <label className="flex items-center justify-center w-48 h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100">
        <span className="text-gray-700">Upload Image</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      <div
        className={
          !isProgressBar
            ? "hidden"
            : "h-[6px] w-full border rounded overflow-hidden mt-1"
        }
      >
        <div
          className="h-full bg-primary dark:bg-white transition-all duration-150"
          style={{ width: `${progressState}%` }}
        ></div>
      </div>
    </div>
  );
}
