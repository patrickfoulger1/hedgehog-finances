import { LoginForm } from "@/app/login/login-form";
import AuthPage from "@/components/AuthPage";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <AuthPage>
      <Suspense fallback="Loading...">
        <LoginForm />
      </Suspense>
    </AuthPage>
  );
}
