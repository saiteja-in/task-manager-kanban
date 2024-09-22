
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function DashboardPage() {

  const user = await getCurrentUser();
 console.log("user information",user)
  if (!user) redirect("/sign-in");
  

  return (
    <div>
    </div>
  );
}
