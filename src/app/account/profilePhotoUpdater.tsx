"use client"
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { User } from "@prisma/client";
import { prisma } from "@/lib/db";
import { CldUploadWidget } from 'next-cloudinary';

export default function ProfilePhotoUpdater({ user }: { user: User }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log();



  return (
    <div className="flex flex-col justify-center">


      <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}>
        {({ open }) => {
          return (
            <Button onClick={() => open()}>
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>;
    </div>
  )
}