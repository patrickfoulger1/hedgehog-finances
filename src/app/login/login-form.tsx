"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { GoogleAuthButton } from "@/components/google-auth-button";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(searchParams.get("error") ? "Couldn't sign you in" : null);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            if (result?.error) {
                setError("Incorrect email or password");
            } else {
                router.push("/dashboard"); //route to go to when login success
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" autoComplete="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input autoComplete="current-password" id="password" type="password" name="password" required />
                    <span className="text-xs text-red-500">{error}</span>
                </div>
                <Button type="submit" disabled={isLoading} className={`w-full ${isLoading ? "" : "cursor-pointer"}`}>
                    {isLoading ? "Signing in..." : "Login"}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
                <GoogleAuthButton setError={setError} setIsLoading={setIsLoading}></GoogleAuthButton>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    );
}
