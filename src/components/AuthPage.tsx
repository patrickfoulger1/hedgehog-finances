import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import hedgehogIcon from "../assets/icons/icon.png";
import financeImage from "../assets/finance.svg";

export default async function AuthPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 lg:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center">
                <Image
                  src={hedgehogIcon}
                  height={64}
                  width={64}
                  alt={"hedgehog"}
                  className="rounded-full"
                ></Image>
              </div>
              Hedgehog
            </Link>
          </div>
          <div className="flex flex-1  items-center justify-center">
            <div className="w-full max-w-xs">{children}</div>
          </div>
        </div>
        <div className="relative hidden lg:block m-auto">
          <Image
            src={financeImage}
            height={400}
            width={400}
            alt={"finance"}
            className=""
          ></Image>
        </div>
      </div>
    </>
  );
}
