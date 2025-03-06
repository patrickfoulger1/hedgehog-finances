import { LoginForm } from "@/app/login/login-form";
import { Suspense } from "react";
import AuthPage from "@/components/AuthPage";

export default function LoginPage() {
    return (
        <AuthPage>
            <Suspense fallback={<>Loading...</>}>
                <LoginForm />
            </Suspense>
        </AuthPage>
    );
}
