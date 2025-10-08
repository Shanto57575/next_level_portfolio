import { LoginForm } from "@/components/modules/auth/LoginForm";
import { Logo } from "@/components/shared/Logo";
import AuthRedirect from "@/route/AuthRedirect";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "portfolio | Login",
  description: "This is Login Page",
};

export default async function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="font-semibold mb-5 text-2xl">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <AuthRedirect>
          <LoginForm />
        </AuthRedirect>
      </div>
    </div>
  );
}
