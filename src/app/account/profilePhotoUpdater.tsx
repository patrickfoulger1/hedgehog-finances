"use client"
import { useState } from "react";
import { User } from "@prisma/client";
import UploadButton from "@/components/UploadButton";

export default function ProfilePhotoUpdater({ user }: { user: User }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col justify-center">

      <UploadButton
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        // The signatureEndpoint prop is the path to the route that will sign the Cloudinary params
        signatureEndpoint="/api/sign-cloudinary-params"
      >

      </UploadButton>
      {/* <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}>
        {({ open }) => {
          return (
            <Button onClick={() => open()}>
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>; */}
    </div>
  )
}