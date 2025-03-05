"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import ProfilePhotoUpdater from "./profilePhotoUpdater";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function Main({ user }: { user: User }) {
  const [userImage, setUserImage] = useState(user.image);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(user);
  };
  useEffect(() => {
    console.log(`this ran when userImage changed`);
  }, [userImage]);

  return (
    <main className=" w-9/12 m-auto text-center">
      <h1 className="font-semibold">Account</h1>
      <figure className="w-full flex flex-col justify-center items-center">
        <img
          src={userImage ? userImage : "media/profile-image.png"}
          className="w-8/12 md:w-1/2 lg:w-100 rounded-full"
        />
        <ProfilePhotoUpdater user={user} setUserImage={setUserImage} />
      </figure>
      <section className=" flex flex-col justify-center items-center">
        <h2 className="text-2xl my-2">{user.username}</h2>
        <span className="mb-2">{user.email}</span>
        <Button
          className={`${buttonVariants({
            variant: "destructive",
          })} w-2/12 lg:w-1/12 cursor-pointer`}
          onClick={(e) => {
            handleLogout(e);
          }}
        >
          Logout
        </Button>
      </section>
    </main>
  );
}
