import { Suspense } from "react";
import { RegisterForm } from "./RegisterForm";

import AuthPage from "@/components/AuthPage";

export default function RegisterPage() {
  return (
    <AuthPage>
      <Suspense fallback="Loading...">
        <RegisterForm />
      </Suspense>
    </AuthPage>
  );
}
