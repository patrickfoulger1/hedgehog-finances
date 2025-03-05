"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import ProfilePhotoUpdater from "./profilePhotoUpdater";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";


export default function Main({ user }: { user: User }) {
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(user);

  }


  return (
    <main className=" w-9/12 mx-auto text-center">
      <h1 className="font-semibold">Account</h1>
      <figure className="w-full flex flex-col justify-center items-center">
        <img src={user.image ? user.image : "media/profile-image.png"} className="w-8/12 md:w-8/12 lg:w-6/12 xl:w-5/12 rounded-full" />
        <ProfilePhotoUpdater user={user} />
      </figure>
      <section className=" flex flex-col justify-center items-center">
        <h2 className="text-2xl my-2">{user.username}</h2>
        <span className="mb-2">{user.email}</span>
        <Button
          className={`${buttonVariants({ variant: "destructive" })} w-2/12 lg:w-1/12 cursor-pointer`}
          onClick={(e) => { handleLogout(e) }}
        >
          Logout
        </Button>
      </section>
    </main>
  )
}