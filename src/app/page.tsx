import Image from "next/image";

import hedgehogIcon from "../assets/icons/icon.png";

import { LandingButtons } from "./landingButtons";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard"); // Redirects if no session
  }

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full w-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900 clip-triangle"></div>
        <main className="flex flex-col gap-8 row-start-2 items-center z-20">
          <section className="flex items-center gap-2 font-medium select-none">
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
          </section>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">Track your favorite stocks</li>
            <li>Get notified in real time</li>
          </ol>

          <LandingButtons></LandingButtons>
        </main>
        <footer className="z-20 text-xs text-stone-500 absolute bottom-3">
          hedgehog™ a finance company
        </footer>
      </div>
    </>
  );
}
