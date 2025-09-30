import { LoginForm } from "@/components/modules/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "This is Login Page",
};

export default async function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <p className="text-center font-semibold mb-5 text-2xl">
          <Link href="/">ShanSphere</Link>
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
