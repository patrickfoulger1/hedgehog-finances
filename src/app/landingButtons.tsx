"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

export function LandingButtons() {
  const router = useRouter();
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <Button
        className="bg-blue-900 text-white cursor-pointer hover:bg-blue-800"
        onClick={() => {
          router.push("/login");
        }}
      >
        Sign In
      </Button>
      <Button
        className="cursor-pointer"
        onClick={() => {
          router.push("/register");
        }}
      >
        Create Account
      </Button>
    </div>
  );
}
