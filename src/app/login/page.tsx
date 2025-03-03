import { LoginForm } from "@/app/login/login-form";
import Link from "next/link";
import Image from "next/image";
import hedgehogIcon from "../../assets/icons/icon.svg";
import financeImage from "../../assets/finance.svg";
import AuthPage from "@/Components/AuthPage";

export default function LoginPage() {
  return (
    <AuthPage>
      <LoginForm />
    </AuthPage>
  );
}
