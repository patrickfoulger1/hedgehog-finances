
import { RegisterForm } from "./RegisterForm"
import Link from "next/link";
import Image from "next/image";

import AuthPage from "@/Components/AuthPage";


export default function RegisterPage() {
  return (
    <AuthPage>
      <RegisterForm />
    </AuthPage>

  );

}
