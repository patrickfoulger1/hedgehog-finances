"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { handleSignup } from "@/serverActions";
import { GoogleAuthButton } from "@/components/google-auth-button";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      const formData = new FormData(e.currentTarget);

      const { error, newUser } = await handleSignup(formData);

      if (error) {
        setError(error);
      } else {
        await signIn("credentials", {
          redirect: false,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        });

        router.push("/dashboard");
      }
    } catch (error) {
      setError("Could not create account. Try again later");
    } finally {
      setIsLoading(false);
    }
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
        <GoogleAuthButton
          setError={setError}
          setIsLoading={setIsLoading}
        ></GoogleAuthButton>
      </div>
    </form>
  );
}
