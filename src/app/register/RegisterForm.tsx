"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { handleSignup } from "@/serverActions";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(searchParams.get("error") ? "Couldn't sign you in" : null);
  }, []);

  const handleGoogleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    signIn("google");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const password = formData.get("password") as string;


    // try {
    const result = await handleSignup(formData)
    // if (result?.error) {
    //   setError("Incorrect email or password");
    // } 
    // else {
    //   router.push("/"); //route to go to when login success
    // }
    // } catch (error) {
    //   setError("An error occurred. Please try again later.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign up</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to register your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="m@example.com"
            required
          />
          <Label htmlFor="first-name">First Name</Label>
          <Input
            id="first-name"
            type="first-name"
            name="first-name"
            autoComplete="first-name"
            placeholder="John"
            min={1}
            pattern="[a-zA-Z]*"
            required
          />
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            type="last-name"
            name="last-name"
            autoComplete="last-name"
            placeholder="Smith"
            min={1}
            pattern="[a-zA-Z]*"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <p className="text-balance text-sm text-muted-foreground">
            Must contain at least 8 characters and at least one number or symbol
          </p>
          <Input
            autoComplete="current-password"
            id="password"
            type="password"
            name="password"
            pattern="^(?=.*\d)[A-Za-z\d]{8,}$"
            required
          />

          <span className="text-xs text-red-500">{error}</span>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full ${isLoading ? "" : "cursor-pointer"}`}
        >
          {isLoading ? "Signing in..." : "Sign up"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Sign up with Google
        </Button>
      </div>

    </form>
  );
}
