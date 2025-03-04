import Image from "next/image";
import Link from "next/link";
import hedgehogIcon from "../assets/icons/icon.png";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button className="bg-blue-900 text-white cursor-pointer hover:bg-blue-800">
              Sign In
            </Button>
            <Button className="cursor-pointer">Create Account</Button>
          </div>
        </main>
        <footer className="z-20 text-xs text-stone-500 absolute bottom-3">
          hedgehog™ a finance company
        </footer>
      </div>
    </>
  );
}
