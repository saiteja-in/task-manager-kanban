"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/sign-in",
      redirect: true,
    });
  };

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </DropdownMenuItem>
  );
}
