"use client";

import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push("/table");
      }
    });
  }, [router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/table" });
  };

  return (
    <div className="mx-auto flex min-h-[80dvh] items-center justify-center py-24">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account using Google.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full text-base"
            variant="secondary"
          >
            <FaGoogle className="mr-2 h-6 w-6" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
