"use client";

import { Button } from "@/components/ui/button";
import { pageTitleStyles } from "@/styles/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignedOutPage() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <h1 className={pageTitleStyles}>Signed Out Successfully.</h1>
      <p className="text-xl">
      You can now sign in to your account.
      </p>

      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
